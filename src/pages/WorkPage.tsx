import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { projects } from '../data/projects';
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

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory as ProjectCategory));

  return (
    <>
      <SEOHead
        title="Work"
        description="Selected work from KHULA — product design, UX, brand identity and digital experiences across fintech, proptech, infrastructure technology and creative strategy."
        canonical="/work"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <SectionLabel className="mb-4 block">Portfolio</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Selected Work</h1>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            A selection of product design, brand identity and digital experience projects. Each
            project has a distinct problem, audience and design challenge.
          </p>
          <p className="text-xs text-brand-grey mt-4">
            Projects are clearly labelled as concepts, prototypes or deployed products where
            applicable.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 md:top-18 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-content py-4">
          <div
            className="flex items-center gap-1.5 flex-wrap"
            role="group"
            aria-label="Filter by category"
          >
            {ALL_CATEGORIES.map((cat) => (
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
        </div>
      </div>

      {/* Grid */}
      <section className="section-y">
        <div className="container-content">
          {filtered.length === 0 ? (
            <EmptyState
              title="No projects in this category"
              description="Try a different filter to see more work."
              action={
                <Button variant="ghost" size="sm" onClick={() => setActiveCategory('All')}>
                  Show all work
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="group block border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
                  aria-label={`View case study: ${project.title}`}
                >
                  {/* Visual */}
                  <div
                    className={`h-60 md:h-72 bg-gradient-to-br ${project.coverBg} flex items-end p-6 relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <div
                        className="w-72 h-72 rounded-full border opacity-10"
                        style={{ borderColor: project.accentColor }}
                      />
                      <div
                        className="absolute w-48 h-48 rounded-full border opacity-[0.06]"
                        style={{ borderColor: project.accentColor }}
                      />
                    </div>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[6rem] font-700 opacity-[0.04] whitespace-nowrap pointer-events-none"
                      aria-hidden="true"
                      style={{ color: project.accentColor }}
                    >
                      {project.title.split(' ')[0]}
                    </div>

                    <div className="relative z-10 flex items-end justify-between w-full">
                      <Badge variant="outline">{project.maturity}</Badge>
                      <ArrowUpRight
                        size={18}
                        className="text-white/30 group-hover:text-brand-white transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h2 className="font-heading text-xl font-600 text-brand-white group-hover:text-brand-green transition-colors mb-1">
                      {project.title}
                    </h2>
                    <p className="text-sm text-brand-grey mb-1">{project.subtitle}</p>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.categories.map((cat) => (
                        <Badge key={cat} variant="default">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
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
