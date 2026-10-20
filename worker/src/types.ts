/**
 * Database types for the Worker — mirrors src/types/database.ts.
 * Kept separate so the Worker has no dependency on the Vite frontend tree.
 */

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

export interface ServiceFaq { question: string; answer: string }
export interface ArticleSection { heading?: string; paragraphs: string[]; bullets?: string[] }

export interface ProjectRow {
  id: string; slug: string; title: string; subtitle: string;
  categories: ProjectCategory[]; maturity: ProjectMaturity; tagline: string;
  overview: string; problem: string; audience: string; strategy: string;
  design_approach: string; key_decisions: string[]; deliverables: string[];
  role: string; limitations: string; next_steps: string;
  accent_color: string; cover_bg: string;
  sort_order: number; published: boolean; created_at: string; updated_at: string;
}

export interface ServiceRow {
  id: string; slug: string; name: string; category: ServiceCategory;
  billing_type: BillingType; starting_price: number;
  short_description: string; description: string;
  problems_solved: string[]; suitable_for: string[];
  deliverables: string[]; process: string[];
  faqs: ServiceFaq[]; related_project_slugs: string[];
  sort_order: number; published: boolean; created_at: string; updated_at: string;
}

export interface PackageRow {
  id: string; slug: PackageTier; name: string; tagline: string;
  starting_price: number; billing_type: BillingType; popular: boolean;
  inclusions: string[]; exclusions: string[]; scope_dependent: string[];
  cta: string; sort_order: number; published: boolean;
  created_at: string; updated_at: string;
}

export interface ArticleRow {
  id: string; slug: string; title: string; intro: string;
  body: ArticleSection[]; category: ArticleCategory;
  published_at: string; reading_time: number;
  featured: boolean; published: boolean; created_at: string; updated_at: string;
}

export interface EnquiryRow {
  id: string; full_name: string; business: string; email: string;
  phone: string | null; service_slug: string;
  budget_range: BudgetRange; timeframe: Timeframe;
  description: string; consent: boolean; status: EnquiryStatus;
  admin_notes: string | null; ip_address: string | null; user_agent: string | null;
  submitted_at: string; updated_at: string;
}

export type EnquiryInsert = Pick<
  EnquiryRow,
  | 'full_name' | 'business' | 'email' | 'phone'
  | 'service_slug' | 'budget_range' | 'timeframe'
  | 'description' | 'consent' | 'ip_address' | 'user_agent'
>;

export interface Database {
  public: {
    Tables: {
      projects: { Row: ProjectRow; Insert: Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ProjectRow> };
      services: { Row: ServiceRow; Insert: Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ServiceRow> };
      packages: { Row: PackageRow; Insert: Omit<PackageRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PackageRow> };
      articles: { Row: ArticleRow; Insert: Omit<ArticleRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ArticleRow> };
      enquiries: { Row: EnquiryRow; Insert: EnquiryInsert; Update: Partial<EnquiryRow> };
    };
    Views: Record<string, never>;
    Functions: {
      enquiry_rate_limit_ok: { Args: { p_email: string; p_ip_address: string }; Returns: boolean };
    };
    Enums: {
      project_category: ProjectCategory; project_maturity: ProjectMaturity;
      service_category: ServiceCategory; billing_type: BillingType;
      package_tier: PackageTier; article_category: ArticleCategory;
      enquiry_status: EnquiryStatus; budget_range: BudgetRange; timeframe: Timeframe;
    };
  };
}
