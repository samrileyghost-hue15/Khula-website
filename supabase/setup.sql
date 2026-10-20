-- =============================================================================
-- KHULA WEBSITE — Complete Setup Script
-- Run this once in the Supabase SQL Editor (dashboard.supabase.com → SQL Editor)
-- It is safe to run multiple times (uses IF NOT EXISTS / OR REPLACE patterns).
-- =============================================================================

-- ── 1. Schema ─────────────────────────────────────────────────────────────────

\i migrations/20241012000001_initial_schema.sql

-- ── 2. RLS Policies ───────────────────────────────────────────────────────────

\i migrations/20241012000002_rls_policies.sql

-- ── 3. Seed Data ─────────────────────────────────────────────────────────────

\i seed.sql
