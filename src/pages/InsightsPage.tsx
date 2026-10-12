import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { articles } from '../data/articles';
import { formatDate } from '../utils/format';
import type { ArticleCategory } from '../types';

const CATEGORIES: Array<'All' | ArticleCategory> = [
  'All',
  'Product Design',
  'UX Research',
  'MVP & Strategy',
  'Brand',
  'Digital Marketing',
  'SA Digital',
];

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles.find((a) => a.featured);

  return (
    <>
      <SEOHead
        title="Insights"
        description="KHULA Insights — articles on product design, UX research, brand strategy, digital marketing and South African digital entrepreneurship."
        canonical="/insights"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <SectionLabel className="mb-4 block">Ideas and perspectives</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-4">Insights</h1>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            Articles on product design, UX research, brand strategy, digital marketing and digital
            entrepreneurship in the South African context.
          </p>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="border-b border-white/10">
          <div className="container-content py-12">
            <div className="text-xs tracking-widest uppercase text-brand-grey mb-6">
              Featured Article
            </div>
            <Link
              to={`/insights/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              aria-label={`Read: ${featured.title}`}
            >
              <div
                className="h-52 lg:h-64 bg-gradient-to-br from-brand-green/10 to-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-brand-green/30 transition-colors"
                aria-hidden="true"
              >
                <div className="text-center px-8">
                  <div className="font-heading text-3xl font-600 text-brand-green/40">
                    {featured.category}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="green">{featured.category}</Badge>
                  <span className="text-xs text-brand-grey">{featured.readingTime} min read</span>
                </div>
                <h2 className="font-heading text-display-sm text-brand-white group-hover:text-brand-green transition-colors mb-3">
                  {featured.title}
                </h2>
                <p className="text-white/50 leading-relaxed mb-4">{featured.intro}</p>
                <div className="flex items-center gap-2 text-sm text-brand-green">
                  Read article
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="sticky top-16 md:top-18 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container-content py-4">
          <div
            className="flex items-center gap-1.5 flex-wrap"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
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

      {/* Articles */}
      <section className="section-y">
        <div className="container-content">
          {filtered.length === 0 ? (
            <EmptyState
              title="No articles in this category"
              description="Try a different filter to find more articles."
              action={
                <Button variant="ghost" size="sm" onClick={() => setActiveCategory('All')}>
                  Show all articles
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <Link
                  key={article.slug}
                  to={`/insights/${article.slug}`}
                  className="group block border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 p-6"
                  aria-label={`Read: ${article.title}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge variant="default">{article.category}</Badge>
                    <span className="text-xs text-brand-grey">{article.readingTime} min</span>
                  </div>
                  <h2 className="font-heading text-base font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug mb-3">
                    {article.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                    {article.intro}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-brand-grey">{formatDate(article.publishedAt)}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-white/20 group-hover:text-brand-green transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CMS note */}
      <section className="border-t border-white/10 py-12">
        <div className="container-content max-w-2xl mx-auto text-center">
          <p className="text-xs text-brand-grey/60 leading-relaxed">
            Articles are currently managed as structured local content. A CMS-backed publishing
            workflow can be connected to this section as the Insights library grows.
          </p>
        </div>
      </section>
    </>
  );
}
