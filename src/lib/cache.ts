/**
 * Tiny module-level cache with TTL (time-to-live) and manual invalidation.
 *
 * Used by all data-fetching hooks so they:
 *  - Share a single in-memory result across parallel consumers
 *  - Automatically revalidate after STALE_MS milliseconds
 *  - Can be explicitly invalidated (e.g. after a form submission)
 */

const STALE_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

/** Return cached data if it exists and is still fresh, otherwise undefined. */
export function getCache<T>(key: string): T | undefined {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return undefined;
  if (Date.now() - entry.fetchedAt > STALE_MS) {
    store.delete(key);
    return undefined;
  }
  return entry.data;
}

/** Store data with a timestamp. */
export function setCache<T>(key: string, data: T): void {
  store.set(key, { data, fetchedAt: Date.now() });
}

/** Remove a specific key (force next access to re-fetch). */
export function invalidateCache(key: string): void {
  store.delete(key);
  inflight.delete(key);
}

/** Invalidate all cached keys. */
export function invalidateAll(): void {
  store.clear();
  inflight.clear();
}

/**
 * Deduplicated fetch with cache.
 * If a fetch is already in-flight for this key, returns the same promise.
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = getCache<T>(key);
  if (cached !== undefined) return cached;

  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = fetcher()
    .then((data) => {
      setCache(key, data);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise as Promise<unknown>);
  return promise;
}
