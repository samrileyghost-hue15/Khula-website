import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { SectionLabel } from '../components/ui/SectionLabel';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useServices } from '../hooks/useServices';
import { priceLabel } from '../utils/format';
import type { ServiceCategory } from '../types';

// Consolidated categories — merge the two single-service categories under "Design & Strategy"
const CATEGORIES: Array<{ label: string; value: string }> = [
  { label: 'All', value: 'All' },
  { label: 'Product & UX', value: 'Product & UX' },
  { label: 'Web & Brand', value: 'Web & Brand' },        // Web & Digital + Brand & Creative
  { label: 'Strategy', value: 'Strategy & Growth' },
  { label: 'Marketing', value: 'Marketing & Performance' },
];

// Map the consolidated "Web & Brand" bucket
function matchesCategory(serviceCategory: ServiceCategory, filter: string): boolean {
  if (filter === 'All') return true;
  if (filter === 'Web & Brand') {
    return serviceCategory === 'Web & Digital' || serviceCategory === 'Brand & Creative';
  }
  return serviceCategory === filter;
}

function ServiceCardSkeleton() {
  return (
    <div className="p-5 border border-white/10 animate-pulse" aria-hidden="true">
      <div className="h-4 bg-white/[0.06] rounded w-1/2 mb-2" />
      <div className="h-3 bg-white/[0.04] rounded w-full mb-1" />
      <div className="h-3 bg-white/[0.04] rounded w-4/5 mb-4" />
      <div className="h-4 bg-white/[0.05] rounded w-20" />
    </div>
  );
}

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { services, loading } = useServices();

  const filtered = services.filter((s) => matchesCategory(s.category, activeCategory));

  return (
    <>
      <SEOHead
        title="Services"
        description="KHULA offers product design, UX research, website design, brand identity, digital strategy and marketing services. Starting from R5,000."
        canonical="/services"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-2xl">
          <SectionLabel className="mb-4 block">What we do</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Services</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Product design, digital experiences, brand identity and marketing — scoped to your
            actual needs, not a predefined package.
          </p>
        </div>
      </section>

      {/* Category filters — one row, no search box */}
      <div className="sticky top-16 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-content py-3">
          <div
            className="flex items-center gap-1.5 flex-wrap"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${activeCategory === value
                  ? 'bg-brand-green text-brand-black'
                  : 'bg-white/5 text-brand-grey hover:text-brand-white hover:bg-white/8'
                  }`}
                aria-pressed={activeCategory === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-y" aria-live="polite" aria-busy={loading}>
        <div className="container-content">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No services in this category"
              description="Try a different filter."
              action={
                <Button variant="ghost" size="sm" onClick={() => setActiveCategory('All')}>
                  <RefreshCw size={13} />
                  Show all
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group flex items-start justify-between gap-4 p-5 border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200"
                  aria-label={service.name}
                >
                  <div className="min-w-0">
                    {/* Name */}
                    <h2 className="font-heading text-sm font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug mb-1.5">
                      {service.name}
                    </h2>
                    {/* One-line description */}
                    <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Price + arrow — right-aligned */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-brand-green font-medium whitespace-nowrap">
                      {priceLabel(service.startingPrice)}
                      {service.billingType === 'monthly' ? '/mo' : ''}
                    </div>
                    <ArrowUpRight
                      size={12}
                      className="text-white/15 group-hover:text-brand-green transition-colors mt-1.5 ml-auto"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <p className="text-xs text-brand-grey/50 mt-6">
              Starting prices — final cost agreed in the project proposal. Ad spend always separate.
            </p>
          )}
        </div>
      </section>

      {/* Slim CTA — not a full section */}
      <div className="border-t border-white/10 py-12">
        <div className="container-content flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-brand-white font-heading text-base font-600 mb-0.5">
              Not sure which service fits?
            </p>
            <p className="text-sm text-brand-grey">Describe your project and we will suggest the right approach.</p>
          </div>
          <Button as="link" to="/contact" variant="primary" size="md" className="flex-shrink-0">
            Start a Project
          </Button>
        </div>
      </div>
    </>
  );
}
