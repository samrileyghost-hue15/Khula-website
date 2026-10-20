import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { useArticle, useArticles } from '../../hooks/useArticles';
import { formatDate } from '../../utils/format';
import type { ArticleSection } from '../../types';

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="border-b border-white/10 py-4">
        <div className="container-content h-4 bg-white/[0.04] rounded w-56" />
      </div>
      <div className="section-y border-b border-white/10">
        <div className="container-content max-w-3xl space-y-4">
          <div className="flex gap-3">
            <div className="h-6 bg-white/[0.05] rounded w-24" />
            <div className="h-6 bg-white/[0.04] rounded w-16" />
          </div>
          <div className="h-9 bg-white/[0.06] rounded w-3/4" />
          <div className="h-9 bg-white/[0.06] rounded w-1/2" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-white/[0.04] rounded w-full" />
            <div className="h-4 bg-white/[0.04] rounded w-5/6" />
          </div>
        </div>
      </div>
      <div className="section-y">
        <div className="container-content max-w-3xl space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-white/[0.05] rounded w-1/3" />
              <div className="h-3 bg-white/[0.04] rounded w-full" />
              <div className="h-3 bg-white/[0.04] rounded w-5/6" />
              <div className="h-3 bg-white/[0.04] rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useArticle(slug);
  const { articles: allArticles } = useArticles();

  const seoTitle = article?.title ?? (loading ? undefined : 'Article Not Found');
  const seoDesc = article?.intro ?? undefined;
  const seoCanonical = article ? `/insights/${article.slug}` : undefined;

  if (loading) return (
    <>
      <SEOHead title={seoTitle} description={seoDesc} canonical={seoCanonical} />
      <ArticleSkeleton />
    </>
  );

  if (!article) {
    return (
      <div className="section-y container-content text-center">
        <SEOHead title="Article Not Found" noIndex />
        <h1 className="font-heading text-display-sm text-brand-white mb-4">Article Not Found</h1>
        <p className="text-brand-grey mb-6">This article does not exist or has been moved.</p>
        <Button as="link" to="/insights" variant="primary" size="md">View All Insights</Button>
      </div>
    );
  }

  // Related articles from live data (exclude current)
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.intro}
        canonical={`/insights/${article.slug}`}
      />

      {/* Breadcrumb */}
      <div className="border-b border-white/10 py-4">
        <div className="container-content">
          <Breadcrumb items={[{ label: 'Insights', href: '/insights' }, { label: article.title }]} />
        </div>
      </div>

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="green">{article.category}</Badge>
            <span className="text-xs text-brand-grey">{article.readingTime} min read</span>
            <span className="text-xs text-brand-grey/50">·</span>
            <span className="text-xs text-brand-grey">{formatDate(article.publishedAt)}</span>
          </div>
          <h1 className="font-heading text-display-md text-brand-white mb-6">{article.title}</h1>
          <p className="text-xl text-white/60 leading-relaxed">{article.intro}</p>
        </div>
      </section>

      {/* Body */}
      <article className="section-y" aria-label={article.title}>
        <div className="container-content max-w-3xl">
          <div className="prose-khula">
            {article.body.map((section: ArticleSection, i: number) => (
              <div key={i} className="mb-8">
                {section.heading && (
                  <h2 className="font-heading text-xl font-600 text-brand-white mb-4 mt-10 first:mt-0">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-white/70 text-base leading-relaxed mb-4">{para}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 mb-4 border-l-2 border-brand-green/30 pl-5">
                    {section.bullets.map((bullet, k) => (
                      <li key={k} className="text-white/60 text-sm leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Author note */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-start gap-4 p-6 bg-white/[0.03] border border-white/10">
              <div className="w-10 h-10 bg-brand-green/15 border border-brand-green/30 flex items-center justify-center flex-shrink-0 text-brand-green font-heading font-600 text-sm">
                NM
              </div>
              <div>
                <div className="text-sm font-medium text-brand-white mb-0.5">Nkululeko Malaza</div>
                <div className="text-xs text-brand-grey mb-2">Founder &amp; Product Designer, KHULA</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Nkululeko writes on product design, UX strategy, brand identity and digital
                  entrepreneurship in the South African context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-white/10 py-16">
          <div className="container-content">
            <h2 className="font-heading text-display-sm text-brand-white mb-8">More Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/insights/${a.slug}`}
                  className="group block border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-200 p-5"
                  aria-label={`Read: ${a.title}`}
                >
                  <Badge variant="default" className="mb-3">{a.category}</Badge>
                  <h3 className="font-heading text-sm font-600 text-brand-white group-hover:text-brand-green transition-colors leading-snug mb-2">
                    {a.title}
                  </h3>
                  <p className="text-xs text-white/40 line-clamp-2">{a.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nav */}
      <div className="border-t border-white/10 py-8">
        <div className="container-content flex items-center justify-between gap-4">
          <Button as="link" to="/insights" variant="ghost" size="sm">
            <ArrowLeft size={14} />
            All Insights
          </Button>
          <Button as="link" to="/contact" variant="primary" size="sm">
            Start a Project
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </>
  );
}
