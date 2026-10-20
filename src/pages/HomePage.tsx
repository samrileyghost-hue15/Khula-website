import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { useProjects } from '../hooks/useProjects';
import { useServices } from '../hooks/useServices';
import { priceLabel } from '../utils/format';

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" aria-label="Hero">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5F5F2 1px, transparent 1px), linear-gradient(to bottom, #F5F5F2 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/3 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="label-text mb-6">
            Digital Product &amp; Creative Studio · South Africa
          </p>

          <h1 className="font-heading text-display-xl text-brand-white mb-6 tracking-tight">
            Turn ideas into{' '}
            <span className="text-brand-green">things that grow.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/55 max-w-xl mb-10 leading-relaxed">
            KHULA helps businesses and founders transform ideas into digital products, brands and
            experiences — through design, technology and strategy.
          </p>

          {/* One primary, one secondary — no more */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button as="link" to="/contact" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button as="link" to="/work" variant="ghost" size="lg">
              See the Work
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 2. Selected Work ──────────────────────────────────────────────────────────
function SelectedWorkSection() {
  const { projects, loading } = useProjects();
  const featured = projects.slice(0, 4);

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="work-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionLabel className="mb-3 block">Selected Work</SectionLabel>
            <h2 id="work-heading" className="font-heading text-display-md text-brand-white">
              Ideas turned into products.
            </h2>
          </div>
          <Link
            to="/work"
            className="text-sm text-brand-grey hover:text-brand-white flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            All work <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-live="polite" aria-busy={loading}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse" aria-hidden="true">
                <div className="h-52 bg-white/[0.04]" />
                <div className="p-5 space-y-2.5">
                  <div className="h-4 bg-white/[0.06] rounded w-3/5" />
                  <div className="h-3 bg-white/[0.03] rounded w-2/5" />
                </div>
              </div>
            ))
            : featured.map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="group block border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
                aria-label={`View case study: ${project.title}`}
              >
                {/* Cover */}
                <div
                  className={`h-52 md:h-56 bg-gradient-to-br ${project.coverBg} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                    {[220, 140].map((size) => (
                      <div
                        key={size}
                        className="absolute rounded-full border opacity-[0.08]"
                        style={{ width: size, height: size, borderColor: project.accentColor }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-4">
                    <Badge variant="outline">{project.maturity}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight
                      size={15}
                      className="text-white/20 group-hover:text-brand-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Info — name + discipline only */}
                <div className="p-5">
                  <h3 className="font-heading text-base font-600 text-brand-white group-hover:text-brand-green transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-brand-grey">{project.categories.slice(0, 2).join(' · ')}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Services (focused — 4 cards, cleaner) ─────────────────────────────────
function ServicesSection() {
  const { services, loading } = useServices();
  // Show 4 representative services, one per discipline area
  const FEATURED_SLUGS = [
    'product-design',
    'website-design-build',
    'brand-identity',
    'digital-strategy',
  ];
  const featured = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    Boolean
  ) as typeof services;

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="services-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionLabel className="mb-3 block">Services</SectionLabel>
            <h2 id="services-heading" className="font-heading text-display-md text-brand-white">
              How KHULA helps.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm text-brand-grey hover:text-brand-white flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            All 18 services <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" aria-live="polite" aria-busy={loading}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 border border-white/10 animate-pulse" aria-hidden="true">
                <div className="h-4 bg-white/[0.06] rounded w-1/2 mb-3" />
                <div className="h-3 bg-white/[0.03] rounded w-full mb-1.5" />
                <div className="h-3 bg-white/[0.03] rounded w-4/5" />
              </div>
            ))
            : featured.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex items-start justify-between gap-4 p-6 border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200"
                aria-label={`${service.name}`}
              >
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-600 text-brand-white group-hover:text-brand-green transition-colors mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-white/45 line-clamp-1 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm text-brand-green font-medium whitespace-nowrap">
                    {priceLabel(service.startingPrice)}
                  </div>
                  <ArrowUpRight size={13} className="text-white/20 group-hover:text-brand-green transition-colors mt-1 ml-auto" aria-hidden="true" />
                </div>
              </Link>
            ))}
        </div>

        <p className="text-xs text-brand-grey">
          Starting prices — final cost agreed in the project proposal.
        </p>
      </div>
    </section>
  );
}

// ── 4. Founder strip (lean — photo + credentials + one CTA) ──────────────────
function FounderSection() {
  return (
    <section className="section-y border-t border-white/10" aria-labelledby="founder-heading">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="order-1 lg:order-2 max-w-xs mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-brand-green/15 to-transparent" aria-hidden="true" />
              <div className="relative border border-brand-green/20 overflow-hidden">
                <img
                  src="/images/nkululeko-malaza.jpg"
                  alt="Nkululeko Malaza — Founder & Product Designer, KHULA by NKM"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '4/5' }}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/85 to-transparent px-4 py-4">
                  <div className="text-sm font-heading font-600 text-brand-white">Nkululeko Malaza</div>
                  <div className="text-xs tracking-widest text-brand-green uppercase mt-0.5">
                    Founder &amp; Product Designer
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text — one paragraph, credentials, one CTA */}
          <div className="order-2 lg:order-1">
            <SectionLabel className="mb-4 block">About</SectionLabel>
            <h2 id="founder-heading" className="font-heading text-display-sm text-brand-white mb-4">
              Built by a designer who thinks like a founder.
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-6">
              KHULA was founded by Nkululeko Malaza — a product designer who works at the
              intersection of design, technology and strategy to help businesses turn ideas into
              real digital products.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              {[
                'Allan Gray Orbis Foundation Recipient',
                'WR SETA Recipient',
              ].map((cred) => (
                <div key={cred} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-brand-green flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-white/60">{cred}</span>
                </div>
              ))}
            </div>

            <Button as="link" to="/about" variant="ghost" size="md">
              About KHULA
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. Single CTA close ───────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="border-t border-white/10 py-24 md:py-32" aria-label="Call to action">
      <div className="container-content max-w-xl mx-auto text-center">
        <h2 className="font-heading text-display-md text-brand-white mb-4">
          Have an idea worth growing?
        </h2>
        <p className="text-white/50 mb-8 text-lg leading-relaxed">
          Let's turn it into a clear, considered and buildable solution.
        </p>
        <Button as="link" to="/contact" variant="primary" size="lg">
          Start a Project
        </Button>
      </div>
    </section>
  );
}

// ── Page composition — 5 sections, linear flow ───────────────────────────────
export function HomePage() {
  return (
    <>
      <SEOHead
        canonical="/"
        description="KHULA is a founder-led digital product and creative studio helping businesses transform ideas into thoughtful digital products, brands and experiences. Design. Build. Grow."
      />
      <HeroSection />
      <SelectedWorkSection />
      <ServicesSection />
      <FounderSection />
      <CtaSection />
    </>
  );
}
