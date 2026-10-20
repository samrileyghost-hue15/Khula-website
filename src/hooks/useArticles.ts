import { useEffect, useRef, useState, useCallback } from 'react';
import type { Article } from '../types';
import { articles as staticArticles } from '../data/articles';
import { mapArticle } from '../lib/transforms';
import { cachedFetch, invalidateCache } from '../lib/cache';
import type { ArticleRow } from '../types/database';

const KEY = 'articles';
const API_BASE = '/api';

async function fetchArticles(): Promise<Article[]> {
  return cachedFetch<Article[]>(KEY, async () => {
    const res = await fetch(`${API_BASE}/articles`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as ArticleRow[];
    return rows.map(mapArticle);
  });
}

export interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const mounted = useRef(true);

  const load = useCallback((bust = false) => {
    if (bust) invalidateCache(KEY);
    setLoading(true);
    setError(null);
    fetchArticles()
      .then((data) => {
        if (!mounted.current) return;
        setArticles(data);
        setIsFallback(false);
      })
      .catch(() => {
        if (!mounted.current) return;
        setError('Could not load articles.');
        setArticles(staticArticles);
        setIsFallback(true);
      })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  return { articles, loading, error, isFallback, revalidate: () => load(true) };
}

export interface UseArticleResult {
  article: Article | null;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  revalidate: () => void;
}

export function useArticle(slug: string | undefined): UseArticleResult {
  const { articles, loading, error, isFallback, revalidate } = useArticles();
  const article = slug ? (articles.find((a) => a.slug === slug) ?? null) : null;
  return { article, loading, error, isFallback, revalidate };
}
