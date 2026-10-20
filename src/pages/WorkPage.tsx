import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, RefreshCw, Wifi } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Button } from '../components/ui/Button';
import { useProjects } from '../hooks/useProjects';
import type { ProjectCategory } from '../types';

const ALL_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Product Design',
  'Brand Identity',
  'Fintech',
  'PropTech',
  'Infrastructure Technology',
  'UX Research & Strategy',
  'Creative Strategy',
];

// ─── Skeleton card ────────────────────────────────────────────────────────────

function ProjectCardSkeleton() {
  return (
    <div
      className="block border border-white/10 overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      <div className="h-60 md:h-72 bg-white/[0.04]" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-white/[0.06] rounded w-2/3" />
        <div className="h-3 bg-white/[0.04] rounded w-1/2" />
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-4/5" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-20 bg-white/[0.04] rounded" />
          <div className="h-5 w-16 bg-white/[0.04] rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    subtitle: string;
    tagline: string;
    categories: ProjectCategory[];
    maturity: string;
    accentColor: string;
    coverBg: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
      aria-label={`View case study: ${project.title}`}
    >
      {/* Visual cover */}
      <div
        className={`h-60 md:h-72 bg-gradient-to-br ${project.coverBg} relative overflow-hidden`}
      >
        {/* Concentric circles */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {[288, 192, 96].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border opacity-10"
              style={{ width: size, height: size, borderColor: project.accentColor }}
            />
          ))}
        </div>

        {/* Ghost title watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center font-heading text-[5.5rem] font-700 opacity-[0.04] whitespace-nowrap pointer-events-none select-none"
          aria-hidden="true"
          style={{ color: project.accentColor }}
        >
          {project.title.split(' ')[0]}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-right arrow */}
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-brand-black/40 backdrop-blur-sm group-hover:border-white/50 group-hover:bg-brand-black/60 transition-all duration-200">
            <ArrowUpRight
              size={14}
              className="text-white/40 group-hover:text-brand-white transition-colors"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom maturity badge */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline">{project.maturity}</Badge>
        </div>

        {/* Accent bar on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: project.accentColor }}
          aria-hidden="true"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2
            className="font-heading text-lg font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug"
          >
            {project.title}
          </h2>
          {/* Accent dot */}
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: project.accentColor }}
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-brand-grey mb-2">{project.subtitle}</p>
        <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <Badge key={cat} variant="default">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ─── Error banner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border border-yellow-500/20 bg-yellow-500/[0.05] text-yellow-400/80 text-xs mb-8"
      role="alert"
    >
      <Wifi size={14} className="flex-shrink-0" aria-hidden="true" />
      <span>{message} Showing cached data.</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { projects, loading, error } = useProjects();

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) =>
        p.categories.includes(activeCategory as ProjectCategory)
      );

  return (
    <>
      <SEOHead
        title="Work"
        description="Selected work from KHULA — product design, UX, brand identity and digital experiences across fintech, proptech, infrastructure technology and creative strategy."
        canonical="/work"
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <SectionLabel className="mb-4 block">Portfolio</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Selected Work</h1>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            A selection of product design, brand identity and digital experience projects. Each
            project has a distinct problem, audience and design challenge.
          </p>
          <p className="text-xs text-brand-grey mt-4">
            Projects are clearly labelled as concepts, prototypes or deployed products.
          </p>
        </div>
      </section>

      {/* ── Sticky filter bar ──────────────────────────────────────────── */}
      <div className="sticky top-16 md:top-18 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-content py-3">
          <div
            className="flex items-center gap-1.5 flex-wrap"
            role="group"
            aria-label="Filter by category"
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${activeCategory === cat
                    ? 'bg-brand-green text-brand-black'
                    : 'bg-white/5 text-brand-grey hover:text-brand-white hover:bg-white/10'
                  }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section className="section-y" aria-live="polite" aria-busy={loading}>
        <div className="container-content">

          {/* Network error banner (still shows data via fallback) */}
          {error && <ErrorBanner message={error} />}

          {loading ? (
            /* Skeleton grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <p className="text-brand-grey mb-4">No projects in this category.</p>
              <Button variant="ghost" size="sm" onClick={() => setActiveCategory('All')}>
                <RefreshCw size={13} />
                Show all work
              </Button>
            </div>
          ) : (
            /* Project grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          {/* Result count — visible once loaded */}
          {!loading && filtered.length > 0 && (
            <p className="text-xs text-brand-grey/50 mt-8 text-right">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16">
        <div className="container-content text-center">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Tell KHULA about your challenge and we will work out the right approach together.
          </p>
          <Button as="link" to="/contact" variant="primary" size="md">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
}
