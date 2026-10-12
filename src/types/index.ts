// ─── Service Catalogue ────────────────────────────────────────────────────────

export type ServiceBillingType = 'once-off' | 'monthly';

export type ServiceCategory =
  | 'Product & UX'
  | 'Web & Digital'
  | 'Brand & Creative'
  | 'Strategy & Growth'
  | 'Marketing & Performance';

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  billingType: ServiceBillingType;
  startingPrice: number;
  shortDescription: string;
  description: string;
  problemsSolved: string[];
  suitableFor: string[];
  deliverables: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  relatedProjectSlugs?: string[];
}

// ─── Packages ─────────────────────────────────────────────────────────────────

export type PackageTier = 'start' | 'build' | 'grow' | 'retainer';

export interface Package {
  slug: PackageTier;
  name: string;
  tagline: string;
  startingPrice: number;
  billingType: ServiceBillingType;
  popular?: boolean;
  inclusions: string[];
  exclusions: string[];
  scopeDependent: string[];
  cta: string;
}

// ─── Portfolio Projects ────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'Product Design'
  | 'UX Research & Strategy'
  | 'Fintech'
  | 'PropTech'
  | 'Infrastructure Technology'
  | 'Brand Identity'
  | 'Creative Strategy';

export type ProjectMaturity = 'Concept' | 'Prototype' | 'MVP' | 'Deployed';

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
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
  designApproach: string;
  keyDecisions: string[];
  deliverables: string[];
  role: string;
  limitations: string;
  nextSteps: string;
  accentColor: string;
  coverBg: string;
}

// ─── Insights / Articles ──────────────────────────────────────────────────────

export type ArticleCategory =
  | 'Product Design'
  | 'UX Research'
  | 'MVP & Strategy'
  | 'Brand'
  | 'Digital Marketing'
  | 'SA Digital';

export interface Article {
  slug: string;
  title: string;
  intro: string;
  body: ArticleSection[];
  category: ArticleCategory;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

// ─── Enquiry Form ─────────────────────────────────────────────────────────────

export interface EnquiryFormData {
  fullName: string;
  business: string;
  email: string;
  phone?: string;
  serviceSlug: string;
  budgetRange: string;
  timeframe: string;
  description: string;
  consent: boolean;
}
