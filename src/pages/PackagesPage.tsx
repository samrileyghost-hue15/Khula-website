import { Check, X, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { usePackages } from '../hooks/usePackages';
import { priceLabel } from '../utils/format';

// ── Skeleton ──────────────────────────────────────────────────────────────────
function PackageSkeleton() {
  return (
    <div className="border border-white/10 animate-pulse" aria-hidden="true">
      <div className="p-6 space-y-4">
        <div className="h-5 bg-white/[0.06] rounded w-1/3" />
        <div className="h-3 bg-white/[0.04] rounded w-3/4" />
        <div className="h-px bg-white/10 my-4" />
        <div className="h-7 bg-white/[0.05] rounded w-1/2" />
        <div className="space-y-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/[0.05] flex-shrink-0 mt-0.5" />
              <div className="h-3 bg-white/[0.04] rounded flex-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="h-9 bg-white/[0.05] rounded" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function PackagesPage() {
  const { packages, loading } = usePackages();

  return (
    <>
      <SEOHead
        title="Packages"
        description="KHULA offers Start, Build, Grow and Retainer packages for digital product design, brand identity and digital marketing. Transparent starting prices in ZAR."
        canonical="/packages"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <SectionLabel className="mb-4 block">How to engage</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Packages</h1>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            Structured packages designed to match where you are in your project journey. Every
            engagement starts with a proposal that defines the exact scope, deliverables and
            timeline before work begins.
          </p>
          <div className="mt-6 p-4 bg-white/[0.03] border border-white/10 inline-block max-w-xl">
            <p className="text-xs text-brand-grey leading-relaxed">
              <strong className="text-white/70">Pricing note:</strong> Prices shown are starting
              points. Final pricing is agreed in the project proposal based on scope, complexity and
              deliverables. Advertising spend is always separate from any management or service fees.
            </p>
          </div>
        </div>
      </section>

      {/* Package cards */}
      <section className="section-y" aria-live="polite" aria-busy={loading}>
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <PackageSkeleton key={i} />)
              : packages.map((pkg) => (
                <div
                  key={pkg.slug}
                  id={pkg.slug}
                  className={`relative border flex flex-col ${pkg.popular ? 'border-brand-green/40 bg-brand-green/[0.03]' : 'border-white/10'
                    }`}
                >
                  {pkg.popular && (
                    <>
                      <div className="absolute -top-px left-0 right-0 h-px bg-brand-green" />
                      <div className="px-6 pt-5">
                        <Badge variant="green">Most Popular</Badge>
                      </div>
                    </>
                  )}
                  <div className={`p-6 flex-1 ${pkg.popular ? '' : 'pt-6'}`}>
                    <div className="font-heading text-xl font-600 text-brand-white mb-1">{pkg.name}</div>
                    <p className="text-sm text-brand-grey leading-relaxed mb-5">{pkg.tagline}</p>

                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="text-xs text-brand-grey mb-1">Starting from</div>
                      <div className="font-heading text-2xl font-600 text-brand-white">
                        {priceLabel(pkg.startingPrice, '')}
                      </div>
                      {pkg.billingType === 'monthly' && (
                        <div className="text-xs text-brand-grey">/month</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="text-xs tracking-widest uppercase text-brand-grey mb-3">Included</div>
                      <ul className="space-y-2.5">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check size={13} className="text-brand-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-xs text-white/70 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs tracking-widest uppercase text-brand-grey mb-3">Not included</div>
                      <ul className="space-y-2.5">
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <X size={13} className="text-white/30 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-xs text-white/40 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/[0.02] border border-white/8 p-3 mb-6">
                      <div className="text-xs text-brand-grey mb-2">Defined in proposal</div>
                      <ul className="space-y-1.5">
                        {pkg.scopeDependent.map((item, i) => (
                          <li key={i} className="text-xs text-white/40 leading-relaxed">— {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      as="link"
                      to={`/contact?package=${pkg.slug}`}
                      variant={pkg.popular ? 'primary' : 'ghost'}
                      size="md"
                      fullWidth
                    >
                      {pkg.cta}
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y border-t border-white/10">
        <div className="container-content">
          <div className="max-w-2xl mx-auto">
            <SectionLabel className="mb-4 block text-center">How it works</SectionLabel>
            <h2 className="font-heading text-display-sm text-brand-white text-center mb-10">
              Packages are a starting point, not a constraint.
            </h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Select a package', body: 'Choose the package that best reflects the scale and complexity of your project. If you are unsure, start a conversation.' },
                { step: '02', title: 'Define the scope', body: 'KHULA reviews your project brief and produces a proposal that defines the exact scope, deliverables, milestones and timeline.' },
                { step: '03', title: 'Agree and begin', body: 'Once the proposal is agreed, work begins. Pricing, scope and deliverables are confirmed in writing before any work starts.' },
                { step: '04', title: 'Review and deliver', body: 'Structured review points ensure the work is moving in the right direction. Handoff is clean, documented and aligned to the agreed scope.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-6">
                  <div className="font-heading text-2xl font-300 text-white/15 w-10 flex-shrink-0" aria-hidden="true">{step}</div>
                  <div>
                    <h3 className="font-heading text-base font-600 text-brand-white mb-1">{title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="container-content text-center">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">Not sure which package fits?</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Describe your project and KHULA will recommend the most appropriate starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="primary" size="md">Start a Conversation</Button>
            <Button as="link" to="/services" variant="ghost" size="md">Browse Services</Button>
          </div>
        </div>
      </section>
    </>
  );
}
