import { useEffect, useRef, useState, useCallback } from 'react';
import type { Service } from '../types';
import { services as staticServices } from '../data/services';
import { mapService } from '../lib/transforms';
import { cachedFetch, invalidateCache } from '../lib/cache';
import type { ServiceRow } from '../types/database';

const KEY = 'services';
const API_BASE = '/api';

async function fetchServices(): Promise<Service[]> {
  return cachedFetch<Service[]>(KEY, async () => {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as ServiceRow[];
    return rows.map(mapService);
  });
}

export interface UseServicesResult {
  services: Service[];
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useServices(): UseServicesResult {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const mounted = useRef(true);

  const load = useCallback((bust = false) => {
    if (bust) invalidateCache(KEY);
    setLoading(true);
    setError(null);
    fetchServices()
      .then((data) => {
        if (!mounted.current) return;
        setServices(data);
        setIsFallback(false);
      })
      .catch(() => {
        if (!mounted.current) return;
        setError('Could not load services.');
        setServices(staticServices);
        setIsFallback(true);
      })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  return { services, loading, error, isFallback, revalidate: () => load(true) };
}

export interface UseServiceResult {
  service: Service | null;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useService(slug: string | undefined): UseServiceResult {
  const { services, loading, error, isFallback, revalidate } = useServices();
  const service = slug ? (services.find((s) => s.slug === slug) ?? null) : null;
  return { service, loading, error, isFallback, revalidate };
}
