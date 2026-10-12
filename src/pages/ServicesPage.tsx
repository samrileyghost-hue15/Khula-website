import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { services, SERVICE_CATEGORIES } from '../data/services';
import { priceLabel } from '../utils/format';

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = services.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch =
      query === '' ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Services"
        description="KHULA offers product design, UX research, website design, brand identity, digital strategy and marketing services. Starting from R5,000."
        canonical="/services"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <SectionLabel className="mb-4 block">What we do</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Services</h1>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            KHULA works across product design, digital experiences, brand identity and digital
            marketing. Every engagement is scoped to the business's actual needs — not a
            predefined package.
          </p>

          <div className="mt-6 p-4 bg-white/[0.03] border border-white/10 rounded inline-block">
            <p className="text-xs text-brand-grey">
              <strong className="text-brand-white/70">Pricing note:</strong> All prices shown are
              starting estimates. Final pricing depends on scope, complexity and deliverables agreed
              in the project proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 md:top-18 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-content py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Category filters */}
            <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by category">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-brand-green text-brand-black'
                      : 'bg-white/5 text-brand-grey hover:text-brand-white hover:bg-white/10'
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search services…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 text-sm text-brand-white placeholder:text-brand-grey/60 focus:outline-none focus:border-brand-green/50 transition-colors w-48"
                aria-label="Search services"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-y">
        <div className="container-content">
          {filtered.length === 0 ? (
            <EmptyState
              title="No services found"
              description="Try a different category or clear your search."
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveCategory('All');
                    setQuery('');
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <p className="text-xs text-brand-grey mb-6">
                Showing {filtered.length} service{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group block p-6 border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all duration-200"
                    aria-label={`${service.name} — ${priceLabel(service.startingPrice)}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="font-heading text-base font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug">
                        {service.name}
                      </h2>
                      <ArrowUpRight
                        size={14}
                        className="text-white/20 group-hover:text-brand-green transition-colors flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <Badge variant="default" className="mb-3">
                      {service.category}
                    </Badge>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription}
                    </p>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm text-brand-green font-medium">
                        {priceLabel(service.startingPrice)}
                        {service.billingType === 'monthly' ? '/month' : ''}
                      </span>
                      <Badge variant="outline">
                        {service.billingType === 'monthly' ? 'Monthly' : 'Once-off'}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="container-content text-center">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">
            Not sure which service is right?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Describe what you are trying to build or solve, and KHULA will suggest the most
            appropriate approach.
          </p>
          <Button as="link" to="/contact" variant="primary" size="md">
            Start a Conversation
          </Button>
        </div>
      </section>
    </>
  );
}
