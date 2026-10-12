import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { getServiceBySlug, services } from '../../data/services';
import { getProjectBySlug } from '../../data/projects';
import { priceLabel } from '../../utils/format';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="section-y container-content text-center">
        <SEOHead title="Service Not Found" noIndex />
        <h1 className="font-heading text-display-sm text-brand-white mb-4">Service Not Found</h1>
        <p className="text-brand-grey mb-6">
          The service you are looking for does not exist or has been moved.
        </p>
        <Button as="link" to="/services" variant="primary" size="md">
          View All Services
        </Button>
      </div>
    );
  }

  // Related services in same category
  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  const relatedProjects = (service.relatedProjectSlugs || [])
    .map(getProjectBySlug)
    .filter(Boolean);

  return (
    <>
      <SEOHead
        title={service.name}
        description={service.shortDescription}
        canonical={`/services/${service.slug}`}
      />

      {/* Breadcrumb */}
      <div className="border-b border-white/10 py-4">
        <div className="container-content">
          <Breadcrumb
            items={[
              { label: 'Services', href: '/services' },
              { label: service.name },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="green">{service.category}</Badge>
              <Badge variant="outline">
                {service.billingType === 'monthly' ? 'Monthly Retainer' : 'Once-off Project'}
              </Badge>
            </div>
            <h1 className="font-heading text-display-lg text-brand-white mb-4">{service.name}</h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">{service.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div>
                <div className="text-sm text-brand-grey mb-0.5">Starting from</div>
                <div className="font-heading text-3xl font-600 text-brand-white">
                  {priceLabel(service.startingPrice, '')}
                  {service.billingType === 'monthly' && (
                    <span className="text-lg text-brand-grey">/month</span>
                  )}
                </div>
              </div>
              <Button
                as="link"
                to={`/contact?service=${service.slug}`}
                variant="primary"
                size="lg"
              >
                Discuss This Service
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-content py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problems solved */}
            <div>
              <SectionLabel className="mb-4 block">Problems this service addresses</SectionLabel>
              <ul className="space-y-3">
                {service.problemsSolved.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-brand-green" />
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable for */}
            <div>
              <SectionLabel className="mb-4 block">Well suited for</SectionLabel>
              <ul className="space-y-3">
                {service.suitableFor.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-grey flex-shrink-0 mt-2" aria-hidden="true" />
                    <span className="text-white/70 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <SectionLabel className="mb-4 block">Scope and potential deliverables</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/8"
                  >
                    <span className="text-brand-green text-xs mt-0.5 flex-shrink-0">—</span>
                    <span className="text-sm text-white/70">{d}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-grey mt-3">
                Exact deliverables are agreed in the project proposal before commencement.
              </p>
            </div>

            {/* Process */}
            <div>
              <SectionLabel className="mb-4 block">How the engagement works</SectionLabel>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="font-heading text-sm font-600 text-brand-green/60 w-6 flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs.length > 0 && (
              <div>
                <SectionLabel className="mb-6 block">Frequently asked questions</SectionLabel>
                <div className="space-y-5">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-white/10 pb-5">
                      <h3 className="font-heading text-sm font-600 text-brand-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-6">
              <div className="text-xs text-brand-grey mb-2">Starting from</div>
              <div className="font-heading text-2xl font-600 text-brand-white mb-1">
                {priceLabel(service.startingPrice, '')}
                {service.billingType === 'monthly' && (
                  <span className="text-sm text-brand-grey">/month</span>
                )}
              </div>
              <p className="text-xs text-brand-grey/60 mb-5">
                Final pricing depends on scope, complexity and agreed deliverables.
              </p>
              <Button
                as="link"
                to={`/contact?service=${service.slug}`}
                variant="primary"
                size="md"
                fullWidth
              >
                Start Enquiry
              </Button>
            </Card>

            {relatedProjects.length > 0 && (
              <div>
                <div className="text-xs tracking-widest uppercase text-brand-grey mb-4">
                  Related Work
                </div>
                {relatedProjects.map((project) => project && (
                  <Link
                    key={project.slug}
                    to={`/work/${project.slug}`}
                    className="flex items-center justify-between gap-3 py-3 border-b border-white/10 group"
                  >
                    <div>
                      <div className="text-sm font-medium text-brand-white group-hover:text-brand-green transition-colors">
                        {project.title}
                      </div>
                      <div className="text-xs text-brand-grey">{project.subtitle}</div>
                    </div>
                    <ArrowRight size={13} className="text-brand-grey group-hover:text-brand-green transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}

            {related.length > 0 && (
              <div>
                <div className="text-xs tracking-widest uppercase text-brand-grey mb-4">
                  Related Services
                </div>
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="flex items-center justify-between gap-3 py-3 border-b border-white/10 group"
                  >
                    <div>
                      <div className="text-sm font-medium text-brand-white group-hover:text-brand-green transition-colors">
                        {s.name}
                      </div>
                      <div className="text-xs text-brand-green">
                        {priceLabel(s.startingPrice)}
                        {s.billingType === 'monthly' ? '/mo' : ''}
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-brand-grey group-hover:text-brand-green transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="container-content text-center">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">
            Tell KHULA about your project and we will confirm scope, deliverables and a starting
            price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as="link"
              to={`/contact?service=${service.slug}`}
              variant="primary"
              size="md"
            >
              Discuss {service.name}
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={15} />
              Back
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
