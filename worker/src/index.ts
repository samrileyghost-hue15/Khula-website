/**
 * Cloudflare Worker — KHULA API
 *
 * When SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, all data is read
 * from the hosted Supabase Postgres instance.
 *
 * When those env vars are NOT set (e.g. first-run local dev without keys),
 * the Worker falls back to serving the static JSON data so the frontend
 * still renders without any database connection.
 *
 * ── Routes ────────────────────────────────────────────────────────────────────
 *   GET  /api/projects                  all published projects
 *   GET  /api/projects/:slug            single project by slug
 *   GET  /api/services                  all services (optional ?category=)
 *   GET  /api/services/:slug            single service
 *   GET  /api/packages                  all packages
 *   GET  /api/packages/:slug            single package
 *   GET  /api/articles                  all articles (optional ?featured= ?category=)
 *   GET  /api/articles/:slug            single article
 *   POST /api/enquiries                 submit an enquiry (requires Supabase)
 *
 * ── Env bindings (worker/.dev.vars locally, wrangler secrets in production) ──
 *   SUPABASE_URL              hosted project URL
 *   SUPABASE_SERVICE_ROLE_KEY service-role key (read operations)
 *   SUPABASE_ANON_KEY         anon key (enquiry insert — preserves RLS)
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { staticData } from './static-data';

// ─── Env ─────────────────────────────────────────────────────────────────────

export interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_ANON_KEY?: string;
}

function isConfigured(env: Env): boolean {
  return !!(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

// ─── CORS & response helpers ──────────────────────────────────────────────────

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': status === 200
        ? 'public, max-age=300, stale-while-revalidate=600'
        : 'no-store',
      ...CORS,
    },
  });
}

function err(message: string, status = 400): Response {
  return json({ error: message }, status);
}

// ─── Supabase client factories ────────────────────────────────────────────────

function adminClient(env: Env) {
  return createClient<Database>(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function anonClient(env: Env) {
  return createClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ─── Projects ─────────────────────────────────────────────────────────────────

async function getProjects(env: Env): Promise<Response> {
  if (!isConfigured(env)) return json(staticData.projects);
  const { data, error } = await adminClient(env)
    .from('projects').select('*').eq('published', true)
    .order('sort_order', { ascending: true });
  if (error) return err(error.message, 500);
  return json(data);
}

async function getProject(slug: string, env: Env): Promise<Response> {
  if (!isConfigured(env)) {
    const p = staticData.projects.find((x) => x.slug === slug);
    return p ? json(p) : err('Project not found', 404);
  }
  const { data, error } = await adminClient(env)
    .from('projects').select('*').eq('slug', slug).eq('published', true).single();
  if (error?.code === 'PGRST116') return err('Project not found', 404);
  if (error) return err(error.message, 500);
  return json(data);
}

// ─── Services ─────────────────────────────────────────────────────────────────

async function getServices(category: string | null, env: Env): Promise<Response> {
  if (!isConfigured(env)) {
    const list = category
      ? staticData.services.filter((s) => s.category === category)
      : staticData.services;
    return json(list);
  }
  let query = adminClient(env)
    .from('services').select('*').eq('published', true)
    .order('sort_order', { ascending: true });
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) return err(error.message, 500);
  return json(data);
}

async function getService(slug: string, env: Env): Promise<Response> {
  if (!isConfigured(env)) {
    const s = staticData.services.find((x) => x.slug === slug);
    return s ? json(s) : err('Service not found', 404);
  }
  const { data, error } = await adminClient(env)
    .from('services').select('*').eq('slug', slug).eq('published', true).single();
  if (error?.code === 'PGRST116') return err('Service not found', 404);
  if (error) return err(error.message, 500);
  return json(data);
}

// ─── Packages ─────────────────────────────────────────────────────────────────

async function getPackages(env: Env): Promise<Response> {
  if (!isConfigured(env)) return json(staticData.packages);
  const { data, error } = await adminClient(env)
    .from('packages').select('*').eq('published', true)
    .order('sort_order', { ascending: true });
  if (error) return err(error.message, 500);
  return json(data);
}

async function getPackage(slug: string, env: Env): Promise<Response> {
  if (!isConfigured(env)) {
    const p = staticData.packages.find((x) => x.slug === slug);
    return p ? json(p) : err('Package not found', 404);
  }
  const { data, error } = await adminClient(env)
    .from('packages').select('*').eq('slug', slug).eq('published', true).single();
  if (error?.code === 'PGRST116') return err('Package not found', 404);
  if (error) return err(error.message, 500);
  return json(data);
}

// ─── Articles ─────────────────────────────────────────────────────────────────

async function getArticles(
  featured: string | null,
  category: string | null,
  env: Env,
): Promise<Response> {
  if (!isConfigured(env)) {
    let list = [...staticData.articles].sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    );
    if (featured === 'true') list = list.filter((a) => a.featured);
    if (category) list = list.filter((a) => a.category === category);
    return json(list);
  }
  let query = adminClient(env)
    .from('articles').select('*').eq('published', true)
    .order('published_at', { ascending: false });
  if (featured === 'true') query = query.eq('featured', true);
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) return err(error.message, 500);
  return json(data);
}

async function getArticle(slug: string, env: Env): Promise<Response> {
  if (!isConfigured(env)) {
    const a = staticData.articles.find((x) => x.slug === slug);
    return a ? json(a) : err('Article not found', 404);
  }
  const { data, error } = await adminClient(env)
    .from('articles').select('*').eq('slug', slug).eq('published', true).single();
  if (error?.code === 'PGRST116') return err('Article not found', 404);
  if (error) return err(error.message, 500);
  return json(data);
}

// ─── Enquiries ────────────────────────────────────────────────────────────────

async function postEnquiry(request: Request, env: Env): Promise<Response> {
  if (!isConfigured(env) || !env.SUPABASE_ANON_KEY) {
    // Dev mode without Supabase — accept and log, don't persist
    const body = await request.json().catch(() => ({}));
    console.info('[Worker] Enquiry received (no Supabase — dev mode):', body);
    return json({ success: true, dev: true }, 201);
  }

  let body: unknown;
  try { body = await request.json(); }
  catch { return err('Invalid JSON body'); }

  const {
    full_name, business, email, phone,
    service_slug, budget_range, timeframe, description, consent,
  } = body as Record<string, unknown>;

  if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2)
    return err('full_name is required');
  if (!business || typeof business !== 'string' || business.trim().length < 1)
    return err('business is required');
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return err('A valid email is required');
  if (!service_slug || typeof service_slug !== 'string')
    return err('service_slug is required');
  if (!budget_range || typeof budget_range !== 'string')
    return err('budget_range is required');
  if (!timeframe || typeof timeframe !== 'string')
    return err('timeframe is required');
  if (!description || typeof description !== 'string' || description.trim().length < 10)
    return err('description must be at least 10 characters');
  if (consent !== true)
    return err('consent must be true');

  const ip = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For');
  const ua = request.headers.get('User-Agent');

  const { error } = await anonClient(env).from('enquiries').insert({
    full_name: (full_name as string).trim(),
    business: (business as string).trim(),
    email: (email as string).toLowerCase().trim(),
    phone: phone && typeof phone === 'string' ? phone.trim() || null : null,
    service_slug: service_slug as string,
    budget_range: budget_range as Database['public']['Enums']['budget_range'],
    timeframe: timeframe as Database['public']['Enums']['timeframe'],
    description: (description as string).trim(),
    consent: true,
    ip_address: ip ?? null,
    user_agent: ua ?? null,
  });

  if (error) {
    if (error.code === '42501') return err('Too many submissions. Please wait before trying again.', 429);
    return err(error.message, 500);
  }
  return json({ success: true }, 201);
}

// ─── Router ───────────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    // Projects
    if (path === '/api/projects' && method === 'GET') return getProjects(env);
    const projSlug = path.match(/^\/api\/projects\/([^/]+)$/)?.[1];
    if (projSlug && method === 'GET') return getProject(projSlug, env);

    // Services
    if (path === '/api/services' && method === 'GET') return getServices(url.searchParams.get('category'), env);
    const svcSlug = path.match(/^\/api\/services\/([^/]+)$/)?.[1];
    if (svcSlug && method === 'GET') return getService(svcSlug, env);

    // Packages
    if (path === '/api/packages' && method === 'GET') return getPackages(env);
    const pkgSlug = path.match(/^\/api\/packages\/([^/]+)$/)?.[1];
    if (pkgSlug && method === 'GET') return getPackage(pkgSlug, env);

    // Articles
    if (path === '/api/articles' && method === 'GET')
      return getArticles(url.searchParams.get('featured'), url.searchParams.get('category'), env);
    const artSlug = path.match(/^\/api\/articles\/([^/]+)$/)?.[1];
    if (artSlug && method === 'GET') return getArticle(artSlug, env);

    // Enquiries
    if (path === '/api/enquiries' && method === 'POST') return postEnquiry(request, env);

    if (path.startsWith('/api/')) return err('Not found', 404);
    return new Response('Not found', { status: 404 });
  },
};
