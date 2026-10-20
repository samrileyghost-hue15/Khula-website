/**
 * Supabase browser client — safe to use in React components and hooks.
 *
 * Uses the PUBLIC anon key only. The service-role key must never appear here.
 * All data access is governed by the RLS policies in:
 *   supabase/migrations/20241012000002_rls_policies.sql
 *
 * Environment variables (set in .env / .env.local):
 *   VITE_SUPABASE_URL       — https://<project>.supabase.co  (or http://127.0.0.1:54321 locally)
 *   VITE_SUPABASE_ANON_KEY  — the public anon JWT
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[supabase] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.\n' +
      'Copy .env.example to .env and fill in the values from your Supabase project.',
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This is a public marketing/portfolio site — we don't need persistent
    // auth sessions in localStorage. If admin auth is added later, revisit.
    persistSession: false,
    autoRefreshToken: false,
  },
});
