/**
 * Transform functions — snake_case DB rows → camelCase frontend types.
 *
 * The Supabase API (and the Worker) return raw Postgres row data in snake_case.
 * The frontend types (src/types/index.ts) use camelCase.
 * These pure functions bridge the gap so every page gets correctly shaped data.
 */

import type { Project, Service, Package, Article } from '../types';
import type {
  ProjectRow,
  ServiceRow,
  PackageRow,
  ArticleRow,
} from '../types/database';

export function mapProject(row: ProjectRow): Project {
  return {
    slug:           row.slug,
    title:          row.title,
    subtitle:       row.subtitle,
    categories:     row.categories,
    maturity:       row.maturity,
    tagline:        row.tagline,
    overview:       row.overview,
    problem:        row.problem,
    audience:       row.audience,
    strategy:       row.strategy,
    designApproach: row.design_approach,
    keyDecisions:   row.key_decisions,
    deliverables:   row.deliverables,
    role:           row.role,
    limitations:    row.limitations,
    nextSteps:      row.next_steps,
    accentColor:    row.accent_color,
    coverBg:        row.cover_bg,
  };
}

export function mapService(row: ServiceRow): Service {
  return {
    slug:                 row.slug,
    name:                 row.name,
    category:             row.category,
    billingType:          row.billing_type,
    startingPrice:        row.starting_price,
    shortDescription:     row.short_description,
    description:          row.description,
    problemsSolved:       row.problems_solved,
    suitableFor:          row.suitable_for,
    deliverables:         row.deliverables,
    process:              row.process,
    faqs:                 row.faqs,
    relatedProjectSlugs:  row.related_project_slugs,
  };
}

export function mapPackage(row: PackageRow): Package {
  return {
    slug:           row.slug,
    name:           row.name,
    tagline:        row.tagline,
    startingPrice:  row.starting_price,
    billingType:    row.billing_type,
    popular:        row.popular,
    inclusions:     row.inclusions,
    exclusions:     row.exclusions,
    scopeDependent: row.scope_dependent,
    cta:            row.cta,
  };
}

export function mapArticle(row: ArticleRow): Article {
  return {
    slug:        row.slug,
    title:       row.title,
    intro:       row.intro,
    body:        row.body,
    category:    row.category,
    publishedAt: row.published_at,
    readingTime: row.reading_time,
    featured:    row.featured,
  };
}
