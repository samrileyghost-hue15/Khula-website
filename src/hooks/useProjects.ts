import { useEffect, useRef, useState, useCallback } from 'react';
import type { Project } from '../types';
import { projects as staticProjects } from '../data/projects';
import { mapProject } from '../lib/transforms';
import { cachedFetch, invalidateCache } from '../lib/cache';
import type { ProjectRow } from '../types/database';

const KEY = 'projects';
const API_BASE = '/api';

async function fetchProjects(): Promise<Project[]> {
  return cachedFetch<Project[]>(KEY, async () => {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as ProjectRow[];
    return rows.map(mapProject);
  });
}

export interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const mounted = useRef(true);

  const load = useCallback((bust = false) => {
    if (bust) invalidateCache(KEY);
    setLoading(true);
    setError(null);
    fetchProjects()
      .then((data) => {
        if (!mounted.current) return;
        setProjects(data);
        setIsFallback(false);
      })
      .catch(() => {
        if (!mounted.current) return;
        setError('Could not load projects.');
        setProjects(staticProjects);
        setIsFallback(true);
      })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  return { projects, loading, error, isFallback, revalidate: () => load(true) };
}

export interface UseProjectResult {
  project: Project | null;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useProject(slug: string | undefined): UseProjectResult {
  const { projects, loading, error, isFallback, revalidate } = useProjects();
  const project = slug ? (projects.find((p) => p.slug === slug) ?? null) : null;
  return { project, loading, error, isFallback, revalidate };
}
