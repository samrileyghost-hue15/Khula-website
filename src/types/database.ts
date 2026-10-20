/**
 * Database types for the KHULA Supabase schema.
 *
 * These are hand-authored to match supabase/migrations/20241012000001_initial_schema.sql.
 * Once `supabase start` is running, regenerate with:
 *   npx supabase gen types typescript --local > src/types/database.ts
 *
 * Row    = what you get back from SELECT
 * Insert = what you pass to INSERT (required fields only, optional for defaults)
 * Update = what you pass to UPDATE (all fields optional)
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'Product Design'
  | 'UX Research & Strategy'
  | 'Fintech'
  | 'PropTech'
  | 'Infrastructure Technology'
  | 'Brand Identity'
  | 'Creative Strategy';

export type ProjectMaturity = 'Concept' | 'Prototype' | 'MVP' | 'Deployed';

export type ServiceCategory =
  | 'Product & UX'
  | 'Web & Digital'
  | 'Brand & Creative'
  | 'Strategy & Growth'
  | 'Marketing & Performance';

export type BillingType = 'once-off' | 'monthly';

export type PackageTier = 'start' | 'build' | 'grow' | 'retainer';

export type ArticleCategory =
  | 'Product Design'
  | 'UX Research'
  | 'MVP & Strategy'
  | 'Brand'
  | 'Digital Marketing'
  | 'SA Digital';

export type EnquiryStatus = 'new' | 'read' | 'replied' | 'archived';

export type BudgetRange =
  | 'under-10k'
  | '10k-25k'
  | '25k-50k'
  | '50k-100k'
  | 'over-100k'
  | 'retainer'
  | 'unsure';

export type Timeframe =
  | 'asap'
  | '1-month'
  | '1-3-months'
  | '3-6-months'
  | 'flexible'
  | 'unsure';

// ─── JSONB shapes ─────────────────────────────────────────────────────────────

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

// ─── Table row types ──────────────────────────────────────────────────────────

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  maturity: ProjectMaturity;
  tagline: string;
  overview: string;
  problem: string;
  audience: string;
  strategy: string;
  design_approach: string;
  key_decisions: string[];
  deliverables: string[];
  role: string;
  limitations: string;
  next_steps: string;
  accent_color: string;
  cover_bg: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceRow {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  billing_type: BillingType;
  starting_price: number;
  short_description: string;
  description: string;
  problems_solved: string[];
  suitable_for: string[];
  deliverables: string[];
  process: string[];
  faqs: ServiceFaq[];
  related_project_slugs: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PackageRow {
  id: string;
  slug: PackageTier;
  name: string;
  tagline: string;
  starting_price: number;
  billing_type: BillingType;
  popular: boolean;
  inclusions: string[];
  exclusions: string[];
  scope_dependent: string[];
  cta: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  intro: string;
  body: ArticleSection[];
  category: ArticleCategory;
  published_at: string;
  reading_time: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnquiryRow {
  id: string;
  full_name: string;
  business: string;
  email: string;
  phone: string | null;
  service_slug: string;
  budget_range: BudgetRange;
  timeframe: Timeframe;
  description: string;
  consent: boolean;
  status: EnquiryStatus;
  admin_notes: string | null;
  ip_address: string | null;
  user_agent: string | null;
  submitted_at: string;
  updated_at: string;
}

// ─── Insert types (omit server-generated fields) ──────────────────────────────

export type ProjectInsert = Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>;
export type ServiceInsert = Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'>;
export type PackageInsert = Omit<PackageRow, 'id' | 'created_at' | 'updated_at'>;
export type ArticleInsert = Omit<ArticleRow, 'id' | 'created_at' | 'updated_at'>;
export type EnquiryInsert = Pick<
  EnquiryRow,
  | 'full_name'
  | 'business'
  | 'email'
  | 'phone'
  | 'service_slug'
  | 'budget_range'
  | 'timeframe'
  | 'description'
  | 'consent'
  | 'ip_address'
  | 'user_agent'
>;

// ─── Update types (all fields optional) ──────────────────────────────────────

export type ProjectUpdate = Partial<ProjectInsert>;
export type ServiceUpdate = Partial<ServiceInsert>;
export type PackageUpdate = Partial<PackageInsert>;
export type ArticleUpdate = Partial<ArticleInsert>;
export type EnquiryUpdate = Partial<Pick<EnquiryRow, 'status' | 'admin_notes'>>;

// ─── Database interface (used to type the Supabase client) ───────────────────

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      services: {
        Row: ServiceRow;
        Insert: ServiceInsert;
        Update: ServiceUpdate;
      };
      packages: {
        Row: PackageRow;
        Insert: PackageInsert;
        Update: PackageUpdate;
      };
      articles: {
        Row: ArticleRow;
        Insert: ArticleInsert;
        Update: ArticleUpdate;
      };
      enquiries: {
        Row: EnquiryRow;
        Insert: EnquiryInsert;
        Update: EnquiryUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: {
      enquiry_rate_limit_ok: {
        Args: { p_email: string; p_ip_address: string };
        Returns: boolean;
      };
    };
    Enums: {
      project_category: ProjectCategory;
      project_maturity: ProjectMaturity;
      service_category: ServiceCategory;
      billing_type: BillingType;
      package_tier: PackageTier;
      article_category: ArticleCategory;
      enquiry_status: EnquiryStatus;
      budget_range: BudgetRange;
      timeframe: Timeframe;
    };
  };
}
