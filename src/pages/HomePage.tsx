import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionLabel } from '../components/ui/SectionLabel';
import { useProjects } from '../hooks/useProjects';
import { useServices } from '../hooks/useServices';
import { usePackages } from '../hooks/usePackages';
import { priceLabel } from '../utils/format';

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5F5F2 1px, transparent 1px), linear-gradient(to bottom, #F5F5F2 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      {/* Green accent */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 py-24 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <SectionLabel>Digital Product &amp; Creative Studio</SectionLabel>
            <span className="w-8 h-px bg-brand-green" aria-hidden="true" />
            <span className="label-text">South Africa</span>
          </div>

          <h1 className="font-heading text-display-xl text-brand-white mb-6 tracking-tight">
            Turn ideas into{' '}
            <span className="text-brand-green">things that grow.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
            KHULA is a founder-led digital product and creative studio helping businesses and
            ambitious founders transform ideas into thoughtful digital products, brands and
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button as="link" to="/contact" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button as="link" to="/work" variant="ghost" size="lg">
              Explore Our Work
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 max-w-md">
            {[
              { label: 'Services', value: '18+' },
              { label: 'Disciplines', value: '3' },
              { label: 'Focus', value: 'SA market' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-heading text-xl font-600 text-brand-white">{value}</div>
                <div className="text-xs text-brand-grey mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Positioning ───────────────────────────────────────────────────────────────
function PositioningSection() {
  return (
    <section className="section-y border-t border-white/10" aria-label="Studio positioning">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionLabel className="mb-4 block">Design × Technology × Strategy</SectionLabel>
            <h2 className="font-heading text-display-md text-brand-white mb-6">
              Design that moves ideas forward.
            </h2>
            <p className="prose-khula">
              Most studios separate design from strategy from technology. KHULA works at the
              intersection of all three — because the best digital products are ones where user
              needs, business goals and practical execution are inseparable.
            </p>
            <p className="prose-khula">
              We help businesses at the stage where ideas need to become real things: designed,
              built and positioned to grow in the markets they serve.
            </p>
            <Button as="link" to="/about" variant="outline" size="md" className="mt-6">
              About KHULA
              <ArrowRight size={15} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: 'Design',
                description:
                  'Product design, UX research, brand identity and creative direction. Design is where clarity starts.',
              },
              {
                label: 'Technology',
                description:
                  'Website and product builds that translate design into working, accessible digital experiences.',
              },
              {
                label: 'Strategy',
                description:
                  'Digital strategy and marketing that connects what is built to the audiences and outcomes that matter.',
              },
            ].map(({ label, description }) => (
              <Card key={label} className="p-6">
                <div className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-base font-600 text-brand-white mb-1">{label}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Selected Work ──────────────────────────────────────────────────────────────

function FeaturedCardSkeleton() {
  return (
    <div className="block border border-white/10 overflow-hidden animate-pulse" aria-hidden="true">
      <div className="h-52 md:h-60 bg-white/[0.04]" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-white/[0.06] rounded w-3/5" />
        <div className="h-3 bg-white/[0.04] rounded w-2/5" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-20 bg-white/[0.04] rounded" />
          <div className="h-5 w-16 bg-white/[0.04] rounded" />
        </div>
      </div>
    </div>
  );
}

function SelectedWorkSection() {
  const { projects, loading } = useProjects();
  const featured = projects.slice(0, 4);

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="work-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel className="mb-3 block">Selected Work</SectionLabel>
            <h2 id="work-heading" className="font-heading text-display-md text-brand-white">
              Ideas turned into products.
            </h2>
          </div>
          <Button as="link" to="/work" variant="ghost" size="sm">
            View All Work
            <ArrowRight size={14} />
          </Button>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-live="polite"
          aria-busy={loading}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <FeaturedCardSkeleton key={i} />)
            : featured.map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="group block relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
                aria-label={`View case study: ${project.title}`}
              >
                {/* Cover */}
                <div
                  className={`h-52 md:h-60 bg-gradient-to-br ${project.coverBg} relative overflow-hidden`}
                >
                  {/* Concentric circles */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                  >
                    {[256, 168, 80].map((size) => (
                      <div
                        key={size}
                        className="absolute rounded-full border opacity-10"
                        style={{ width: size, height: size, borderColor: project.accentColor }}
                      />
                    ))}
                  </div>

                  {/* Ghost watermark */}
                  <div
                    className="absolute inset-0 flex items-center justify-center font-heading text-[5rem] font-700 opacity-[0.04] whitespace-nowrap pointer-events-none select-none"
                    aria-hidden="true"
                    style={{ color: project.accentColor }}
                  >
                    {project.title}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Accent bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: project.accentColor }}
                    aria-hidden="true"
                  />

                  {/* Maturity badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="relative z-10">
                      {project.maturity}
                    </Badge>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 right-4">
                    <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-brand-black/40 backdrop-blur-sm group-hover:border-white/50 transition-all duration-200">
                      <ArrowUpRight
                        size={13}
                        className="text-white/40 group-hover:text-brand-white transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-heading text-lg font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: project.accentColor }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm text-brand-grey mb-3">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.slice(0, 2).map((cat) => (
                      <Badge key={cat} variant="default">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

// ── Services Overview ──────────────────────────────────────────────────────────
function ServicesSection() {
  const { services, loading } = useServices();
  const featured = services.slice(0, 6);

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="services-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel className="mb-3 block">Services</SectionLabel>
            <h2 id="services-heading" className="font-heading text-display-md text-brand-white">
              How KHULA helps.
            </h2>
          </div>
          <Button as="link" to="/services" variant="ghost" size="sm">
            Explore Services
            <ArrowRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" aria-live="polite" aria-busy={loading}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 border border-white/10 animate-pulse" aria-hidden="true">
                <div className="h-4 bg-white/[0.06] rounded w-2/3 mb-3" />
                <div className="h-3 bg-white/[0.04] rounded w-full mb-1.5" />
                <div className="h-3 bg-white/[0.04] rounded w-5/6 mb-4" />
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="h-3 bg-white/[0.05] rounded w-16" />
                  <div className="h-5 bg-white/[0.04] rounded w-20" />
                </div>
              </div>
            ))
            : featured.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group block p-6 border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all duration-200"
                aria-label={`Learn about ${service.name}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-heading text-base font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-brand-green transition-colors flex-shrink-0 mt-0.5" aria-hidden="true" />
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-green font-medium">
                    {priceLabel(service.startingPrice)}
                    {service.billingType === 'monthly' ? '/mo' : ''}
                  </span>
                  <Badge variant="default">{service.category}</Badge>
                </div>
              </Link>
            ))}
        </div>

        <p className="text-sm text-brand-grey text-center">
          Displayed prices are starting estimates.{' '}
          <Link to="/contact" className="text-brand-green hover:underline">Get a tailored quote.</Link>
        </p>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description:
        'Understand the business, its audience and the problem worth solving. Alignment before execution.',
    },
    {
      number: '02',
      title: 'Define',
      description:
        'Clarify the strategy, scope and priorities. Define what success looks like before design begins.',
    },
    {
      number: '03',
      title: 'Design & Build',
      description:
        'Develop the experience, assets and implementation. Deliberate decisions at every step.',
    },
    {
      number: '04',
      title: 'Launch & Grow',
      description:
        'Deliver, evaluate and identify what comes next. A launch is a beginning, not an end.',
    },
  ];

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="process-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel className="mb-3 block">Process</SectionLabel>
            <h2 id="process-heading" className="font-heading text-display-md text-brand-white">
              How a project unfolds.
            </h2>
          </div>
          <Button as="link" to="/process" variant="ghost" size="sm">
            Full Process
            <ArrowRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {steps.map((step) => (
            <div key={step.number} className="bg-brand-black p-8">
              <div className="font-heading text-3xl font-300 text-white/15 mb-4" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="font-heading text-base font-600 text-brand-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-brand-grey text-center mt-6">
          The process adapts to the size and complexity of each engagement.
        </p>
      </div>
    </section>
  );
}

// ── Founder ───────────────────────────────────────────────────────────────────
function FounderSection() {
  return (
    <section className="section-y border-t border-white/10" aria-labelledby="founder-heading">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <SectionLabel className="mb-4 block">About the Studio</SectionLabel>
            <h2 id="founder-heading" className="font-heading text-display-md text-brand-white mb-6">
              Built by a designer who thinks like a founder.
            </h2>
            <p className="prose-khula mb-4">
              KHULA was founded by Nkululeko Malaza — a product designer who approaches every
              engagement with both creative rigour and commercial awareness. The studio works with
              businesses, founders and organisations that need design, technology and strategy to
              work together, not in silos.
            </p>
            <p className="prose-khula mb-8">
              Product thinking, user experience, creative execution and entrepreneurial
              problem-solving are not separate services here. They are the way KHULA works.
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {[
                'Allan Gray Orbis Foundation Recipient',
                'WR SETA Recipient',
                'Founder & Product Designer',
              ].map((cred) => (
                <div key={cred} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-white/70">{cred}</span>
                </div>
              ))}
            </div>

            <Button as="link" to="/about" variant="ghost" size="md">
              About KHULA
              <ArrowRight size={15} />
            </Button>
          </div>

          {/* Photo block */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Green accent border */}
              <div
                className="absolute -inset-2 bg-gradient-to-br from-brand-green/20 to-transparent"
                aria-hidden="true"
              />
              <div className="relative border border-brand-green/25 overflow-hidden">
                <img
                  src="/images/nkululeko-malaza.jpg"
                  alt="Nkululeko Malaza — Founder & Product Designer, KHULA by NKM"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '3/4' }}
                  loading="lazy"
                />
                {/* Name caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 to-transparent px-5 py-4">
                  <div className="font-heading text-sm font-600 text-brand-white">
                    Nkululeko Malaza
                  </div>
                  <div className="text-xs tracking-widest text-brand-green uppercase mt-0.5">
                    Founder &amp; Product Designer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Packages ──────────────────────────────────────────────────────────────────
function PackagesSection() {
  const { packages, loading } = usePackages();
  const featured = packages.slice(0, 3);

  return (
    <section className="section-y border-t border-white/10" aria-labelledby="packages-heading">
      <div className="container-content">
        <div className="text-center mb-12">
          <SectionLabel className="mb-3 block">Packages</SectionLabel>
          <h2 id="packages-heading" className="font-heading text-display-md text-brand-white mb-4">
            Choose how to engage.
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm">
            Structured packages to match where you are — with room to define the exact scope in your
            project proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" aria-live="polite" aria-busy={loading}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-8 border border-white/10 animate-pulse" aria-hidden="true">
                <div className="h-5 bg-white/[0.06] rounded w-1/3 mb-2" />
                <div className="h-3 bg-white/[0.04] rounded w-3/4 mb-5" />
                <div className="h-8 bg-white/[0.05] rounded w-1/2 mb-6" />
                <div className="h-8 bg-white/[0.04] rounded" />
              </div>
            ))
            : featured.map((pkg) => (
              <Card
                key={pkg.slug}
                className={`p-8 relative ${pkg.popular ? 'border-brand-green/40 bg-brand-green/[0.03]' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-brand-green" aria-hidden="true" />
                )}
                {pkg.popular && <Badge variant="green" className="mb-4">Most Popular</Badge>}
                <div className="font-heading text-xl font-600 text-brand-white mb-1">{pkg.name}</div>
                <p className="text-sm text-brand-grey mb-5 leading-relaxed">{pkg.tagline}</p>
                <div className="mb-6">
                  <span className="font-heading text-2xl font-600 text-brand-white">
                    {priceLabel(pkg.startingPrice)}
                  </span>
                  {pkg.billingType === 'monthly' && (
                    <span className="text-sm text-brand-grey ml-1">/month</span>
                  )}
                </div>
                <Button
                  as="link"
                  to={`/packages#${pkg.slug}`}
                  variant={pkg.popular ? 'primary' : 'ghost'}
                  size="sm"
                  fullWidth
                >
                  {pkg.cta}
                </Button>
              </Card>
            ))}
        </div>

        <div className="text-center">
          <Button as="link" to="/packages" variant="ghost" size="md">
            Compare All Packages
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="section-y border-t border-white/10" aria-label="Call to action">
      <div className="container-content">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-display-md text-brand-white mb-4">
            Have an idea worth growing?
          </h2>
          <p className="text-white/50 mb-10 text-lg leading-relaxed">
            Let's turn your next idea into a clear, considered and buildable solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button as="link" to="/packages" variant="ghost" size="lg">
              View Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <>
      <SEOHead
        canonical="/"
        description="KHULA is a founder-led digital product and creative studio helping businesses transform ideas into thoughtful digital products, brands and experiences. Design. Build. Grow."
      />
      <HeroSection />
      <PositioningSection />
      <SelectedWorkSection />
      <ServicesSection />
      <ProcessSection />
      <FounderSection />
      <PackagesSection />
      <CtaSection />
    </>
  );
}
