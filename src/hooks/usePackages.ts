import { useEffect, useRef, useState, useCallback } from 'react';
import type { Package } from '../types';
import { packages as staticPackages } from '../data/packages';
import { mapPackage } from '../lib/transforms';
import { cachedFetch, invalidateCache } from '../lib/cache';
import type { PackageRow } from '../types/database';

const KEY = 'packages';
const API_BASE = '/api';

async function fetchPackages(): Promise<Package[]> {
  return cachedFetch<Package[]>(KEY, async () => {
    const res = await fetch(`${API_BASE}/packages`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as PackageRow[];
    return rows.map(mapPackage);
  });
}

export interface UsePackagesResult {
  packages: Package[];
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function usePackages(): UsePackagesResult {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const mounted = useRef(true);

  const load = useCallback((bust = false) => {
    if (bust) invalidateCache(KEY);
    setLoading(true);
    setError(null);
    fetchPackages()
      .then((data) => {
        if (!mounted.current) return;
        setPackages(data);
        setIsFallback(false);
      })
      .catch(() => {
        if (!mounted.current) return;
        setError('Could not load packages.');
        setPackages(staticPackages);
        setIsFallback(true);
      })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  return { packages, loading, error, isFallback, revalidate: () => load(true) };
}

export interface UsePackageResult {
  pkg: Package | null;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function usePackage(slug: string | undefined): UsePackageResult {
  const { packages, loading, error, isFallback, revalidate } = usePackages();
  const pkg = slug ? (packages.find((p) => p.slug === slug) ?? null) : null;
  return { pkg, loading, error, isFallback, revalidate };
}
