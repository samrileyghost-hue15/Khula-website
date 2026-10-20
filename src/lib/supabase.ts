import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[KHULA] Supabase environment variables are not set. ' +
    'Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Database types ─────────────────────────────────────────────────────────────

export interface EnquiryRow {
  id?: string;
  created_at?: string;
  full_name: string;
  business: string;
  email: string;
  phone: string | null;
  service_slug: string;
  budget_range: string;
  timeframe: string;
  description: string;
  status?: 'new' | 'reviewed' | 'replied' | 'archived';
}
