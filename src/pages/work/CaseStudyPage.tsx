import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { getProjectBySlug, getRelatedProjects } from '../../data/projects';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="section-y container-content text-center">
        <SEOHead title="Project Not Found" noIndex />
        <h1 className="font-heading text-display-sm text-brand-white mb-4">Project Not Found</h1>
        <p className="text-brand-grey mb-6">This project does not exist or has been moved.</p>
        <Button as="link" to="/work" variant="primary" size="md">
          View All Work
        </Button>
      </div>
    );
  }

  const related = getRelatedProjects(project.slug, 2);

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.tagline}
        canonical={`/work/${project.slug}`}
      />

      {/* Breadcrumb */}
      <div className="border-b border-white/10 py-4">
        <div className="container-content">
          <Breadcrumb
            items={[{ label: 'Work', href: '/work' }, { label: project.title }]}
          />
        </div>
      </div>

      {/* Cover */}
      <div
        className={`h-64 md:h-80 bg-gradient-to-br ${project.coverBg} relative overflow-hidden flex items-end`}
        role="img"
        aria-label={`${project.title} project cover`}
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {[240, 160, 80].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: project.accentColor,
                opacity: 0.08,
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center font-heading text-[8rem] font-700 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{ color: project.accentColor }}
        >
          {project.title.split(' ')[0]}
        </div>
        <div className="container-content pb-8 relative z-10">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{project.maturity}</Badge>
            {project.categories.map((cat) => (
              <Badge key={cat} variant="default">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-white/10 py-12">
        <div className="container-content">
          <div className="max-w-3xl">
            <h1 className="font-heading text-display-lg text-brand-white mb-2">{project.title}</h1>
            <p className="text-brand-grey text-lg mb-4">{project.subtitle}</p>
            <p className="text-xl text-white/60 leading-relaxed">{project.tagline}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-content py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <Section label="Overview" content={project.overview} />
            <Section label="The Problem or Opportunity" content={project.problem} />
            <Section label="Target Audience" content={project.audience} />
            <Section label="Product or Brand Strategy" content={project.strategy} />
            <Section label="Design Approach" content={project.designApproach} />

            {/* Key decisions */}
            <div>
              <SectionLabel className="mb-4 block">Key UX and Design Decisions</SectionLabel>
              <ul className="space-y-3">
                {project.keyDecisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="text-sm font-heading font-600 w-5 flex-shrink-0 mt-0.5"
                      style={{ color: project.accentColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-white/70 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <SectionLabel className="mb-4 block">Deliverables</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/8"
                  >
                    <span
                      className="text-xs flex-shrink-0 mt-0.5"
                      style={{ color: project.accentColor }}
                    >
                      —
                    </span>
                    <span className="text-sm text-white/70">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <Section label="Role and Contributions" content={project.role} />

            {/* Limitations — displayed transparently */}
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <SectionLabel className="mb-3 block">Limitations and Scope</SectionLabel>
              <p className="text-sm text-white/60 leading-relaxed">{project.limitations}</p>
            </div>

            <Section label="Next Steps" content={project.nextSteps} />
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* Project meta */}
              <div className="border border-white/10 p-6">
                <div className="text-xs tracking-widest uppercase text-brand-grey mb-4">
                  Project Details
                </div>
                <div className="space-y-3">
                  <MetaRow label="Disciplines" value={project.categories.join(', ')} />
                  <MetaRow label="Maturity" value={project.maturity} />
                </div>
              </div>

              {/* CTA */}
              <div className="border border-white/10 bg-brand-green/[0.03] p-6">
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  Interested in similar work for your project?
                </p>
                <Button
                  as="link"
                  to="/contact"
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  Start a Project
                </Button>
              </div>

              {/* Related projects */}
              {related.length > 0 && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-brand-grey mb-4">
                    More Work
                  </div>
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/work/${p.slug}`}
                      className="flex items-center justify-between gap-3 py-3 border-b border-white/10 group"
                    >
                      <div>
                        <div className="text-sm font-medium text-brand-white group-hover:text-brand-green transition-colors">
                          {p.title}
                        </div>
                        <div className="text-xs text-brand-grey">{p.maturity}</div>
                      </div>
                      <ArrowRight
                        size={13}
                        className="text-brand-grey group-hover:text-brand-green transition-colors flex-shrink-0"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-white/10 py-8">
        <div className="container-content flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} />
            Back
          </Button>
          <Button as="link" to="/work" variant="ghost" size="sm">
            All Work
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </>
  );
}

function Section({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <SectionLabel className="mb-3 block">{label}</SectionLabel>
      <p className="text-white/70 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-brand-grey mb-0.5">{label}</div>
      <div className="text-sm text-white/80">{value}</div>
    </div>
  );
}
