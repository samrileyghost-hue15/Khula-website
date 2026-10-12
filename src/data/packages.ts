import type { Package } from '../types';

export const packages: Package[] = [
  {
    slug: 'start',
    name: 'Start',
    tagline: 'For early-stage ideas and focused digital or brand requirements.',
    startingPrice: 7500,
    billingType: 'once-off',
    inclusions: [
      'Initial discovery and project briefing',
      'A focused deliverable appropriate to the selected service',
      'Up to two rounds of revisions (as defined in proposal)',
      'Figma source files or equivalent design assets',
      'Basic handoff documentation',
    ],
    exclusions: [
      'Development or coding (unless selected as the service)',
      'Content writing or copyediting',
      'Hosting, domain registration or third-party service costs',
      'Advertising spend',
    ],
    scopeDependent: [
      'Exact deliverables are defined in the project proposal',
      'Revision rounds are agreed before commencement',
      'Timeline is confirmed based on project complexity',
    ],
    cta: 'Start with Start',
  },
  {
    slug: 'build',
    name: 'Build',
    tagline: 'For businesses that need a more developed product, website or brand experience.',
    startingPrice: 18000,
    billingType: 'once-off',
    popular: true,
    inclusions: [
      'Extended discovery and alignment workshop',
      'Multi-deliverable scope appropriate to the engagement',
      'Up to three rounds of revisions (as defined in proposal)',
      'Figma source files and design system foundations',
      'Detailed handoff documentation',
      'Post-delivery support period (scope-dependent)',
    ],
    exclusions: [
      'Content writing or copyediting (unless scoped)',
      'Hosting, domain registration or third-party service costs',
      'Advertising spend',
      'Ongoing maintenance unless agreed as a separate engagement',
    ],
    scopeDependent: [
      'The specific services included are agreed in the project proposal',
      'Revision rounds and timelines are confirmed before commencement',
      'Post-delivery support duration is defined in the proposal',
    ],
    cta: 'Start with Build',
  },
  {
    slug: 'grow',
    name: 'Grow',
    tagline:
      'For businesses seeking broader digital development, connected deliverables or a comprehensive growth engagement.',
    startingPrice: 30000,
    billingType: 'once-off',
    inclusions: [
      'Comprehensive discovery, research and alignment',
      'Cross-disciplinary scope spanning multiple service areas',
      'Senior creative and strategic direction throughout',
      'Full design system and documentation',
      'Detailed handoff with implementation guidance',
      'Post-delivery review and support period (scope-dependent)',
    ],
    exclusions: [
      'Content writing or copyediting (unless scoped)',
      'Hosting, domain registration or third-party service costs',
      'Advertising spend',
      'Ongoing maintenance unless agreed separately',
    ],
    scopeDependent: [
      'The precise scope and service mix are agreed in the project proposal',
      'Timeline and milestones are defined before commencement',
      'Post-delivery support is defined in the proposal',
    ],
    cta: 'Start with Grow',
  },
  {
    slug: 'retainer',
    name: 'KHULA Retainer',
    tagline: 'Ongoing design, creative or digital support defined by an agreed monthly scope.',
    startingPrice: 7500,
    billingType: 'monthly',
    inclusions: [
      'A defined monthly scope of design, creative or digital work',
      'Priority access to KHULA capacity each month',
      'Monthly check-in and scope review',
      'Accumulated deliverables against the agreed scope',
    ],
    exclusions: [
      'Work outside the agreed monthly scope',
      'Advertising spend',
      'Third-party platform or tool costs',
    ],
    scopeDependent: [
      'The monthly scope is agreed before the engagement begins',
      'Scope can be reviewed and adjusted at agreed intervals',
      'Minimum engagement period is discussed at project commencement',
    ],
    cta: 'Enquire About a Retainer',
  },
];

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}
