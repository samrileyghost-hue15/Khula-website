import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useArticles } from '../hooks/useArticles';
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

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ArticleCardSkeleton() {
  return (
    <div className="p-6 border border-white/10 animate-pulse" aria-hidden="true">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="h-5 bg-white/[0.05] rounded w-24" />
        <div className="h-3 bg-white/[0.04] rounded w-12" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-white/[0.06] rounded w-full" />
        <div className="h-4 bg-white/[0.06] rounded w-4/5" />
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-5/6" />
        <div className="h-3 bg-white/[0.04] rounded w-3/4" />
      </div>
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="h-3 bg-white/[0.04] rounded w-20" />
        <div className="w-4 h-4 bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { articles, loading } = useArticles();

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
      {!loading && featured && (
        <section className="border-b border-white/10">
          <div className="container-content py-12">
            <div className="text-xs tracking-widest uppercase text-brand-grey mb-6">Featured Article</div>
            <Link
              to={`/insights/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              aria-label={`Read: ${featured.title}`}
            >
              <div
                className="h-52 lg:h-64 bg-gradient-to-br from-brand-green/10 to-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-brand-green/30 transition-colors"
                aria-hidden="true"
              >
                <div className="font-heading text-3xl font-600 text-brand-green/40 text-center px-8">
                  {featured.category}
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
          <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
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

      {/* Articles */}
      <section className="section-y" aria-live="polite" aria-busy={loading}>
        <div className="container-content">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
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
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-brand-green transition-colors" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
