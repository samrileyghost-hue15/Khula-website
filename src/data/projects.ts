import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'regen-rail',
    title: 'REGEN RAIL',
    subtitle: 'Railway Infrastructure Monitoring',
    categories: ['Infrastructure Technology', 'Product Design'],
    maturity: 'Prototype',
    tagline: 'Predictive maintenance and monitoring for railway infrastructure.',
    accentColor: '#3FAF72',
    coverBg: 'from-[#0d1f14] to-[#0B0B0C]',
    overview:
      'REGEN RAIL is a product design exploration for a railway infrastructure monitoring and predictive maintenance platform. The project addressed a critical gap in how railway operators manage track integrity, asset health and maintenance workflows — shifting from reactive maintenance to proactive, data-informed operations.',
    problem:
      'Railway infrastructure teams face a persistent challenge: critical maintenance decisions are made reactively, after incidents occur, rather than proactively. Monitoring systems, where they exist, are fragmented — data lives in disconnected tools, inspection reports are manual and paper-based, and there is no single view of asset health across a network. The result is delayed responses, increased risk and inefficient allocation of maintenance resources.',
    audience:
      'The primary users are infrastructure operations managers and maintenance engineers responsible for track condition, asset health and maintenance scheduling. Secondary users include safety and compliance officers who need audit trails and incident records.',
    strategy:
      'The product strategy focused on three priorities: consolidating monitoring data into a single operational view, surfacing alerts that require human attention rather than overwhelming users with raw data, and creating workflow tools that connect inspection findings to maintenance actions. The design prioritised clarity and speed — operators needed to identify and act on issues quickly, not navigate complex dashboards.',
    designApproach:
      'The interface was designed around an operational control-room mental model — a persistent overview of network status with progressive disclosure into section-level and asset-level detail. Alert management was treated as a primary workflow, not a secondary panel. A dark-mode interface was chosen to reduce eye strain in low-light monitoring environments and to give the product a distinctive, technical character appropriate to its industrial context.',
    keyDecisions: [
      'Dark-mode interface chosen for operational contexts and visual clarity of status indicators',
      'Map-based network overview as the primary entry point, replacing tabular asset lists',
      'Alert severity system with three levels (critical, warning, informational) to prevent alert fatigue',
      'Maintenance workflow linked directly from alerts to reduce friction in acting on findings',
      'Role-based views designed for operations managers versus field engineers',
      'Asset relationship model to connect track sections, infrastructure components and inspection records',
    ],
    deliverables: [
      'Product scope definition and feature prioritisation',
      'User flow diagrams for primary monitoring and maintenance workflows',
      'Information architecture for the asset and alert model',
      'High-fidelity UI screens for the dashboard, network map, alert management and maintenance workflow',
      'Interactive Figma prototype covering the core operator journey',
      'Design system components for the monitoring interface',
    ],
    role:
      'Product Designer and UX Architect. Responsible for product strategy, user flow design, information architecture, UI design and prototype production.',
    limitations:
      'REGEN RAIL is a product design prototype. It has not been commercially deployed, validated with railway operators in a live environment, or integrated with real infrastructure monitoring hardware. The data and alert models are representative rather than based on a specific technical implementation. Claims about railway safety performance, regulatory compliance or technical standards cannot be made.',
    nextSteps:
      'The next development priorities would be user research with actual railway operations teams to validate the alert model and workflow assumptions, technical architecture definition for real-time data integration, and a pilot with a maintenance operations team to test the interface in a real monitoring context.',
  },
  {
    slug: 'lelwapa-sa',
    title: 'Lelwapa SA',
    subtitle: 'Rent-to-Own Housing Platform',
    categories: ['PropTech', 'Product Design'],
    maturity: 'Concept',
    tagline: 'Making the path to homeownership clearer and more accessible.',
    accentColor: '#F5A623',
    coverBg: 'from-[#1f1508] to-[#0B0B0C]',
    overview:
      'Lelwapa SA is a product design concept for a rent-to-own housing platform connecting tenants and landlords in the South African property market. The project explored how digital product design could reduce the opacity, complexity and inaccessibility that characterise the rent-to-own pathway for many South Africans.',
    problem:
      'For many South Africans, homeownership feels distant — not because of a lack of aspiration but because the pathway is unclear, institutional barriers are high and available mechanisms like rent-to-own are poorly understood and inconsistently applied. Tenants lack visibility into whether their rent is building toward ownership. Landlords and property owners lack accessible tools for managing rent-to-own agreements. The result is a market opportunity that is under-served by existing technology.',
    audience:
      'Primary: South African tenants who want to build toward homeownership but cannot access traditional mortgage financing in the short term. Secondary: Property owners and landlords who want to offer flexible ownership pathways. The design considered lower-income and first-time-buyer demographics, where digital literacy and device constraints are relevant design factors.',
    strategy:
      'The product strategy centred on transparency and progress visibility — giving tenants a clear understanding of their ownership journey, their payment history and what they need to do next. For landlords, the strategy focused on simplifying agreement management, payment tracking and documentation. Trust was treated as a core product value: the platform needed to feel credible and fair to both parties.',
    designApproach:
      'The interface was designed to be accessible across device types, with a mobile-first approach reflecting the South African context where smartphone access dominates. The visual language was warm, approachable and human — deliberately distinct from the cold, institutional tone of banking and property platforms. Plain language was prioritised over technical terminology.',
    keyDecisions: [
      'Mobile-first design reflecting South African smartphone access patterns',
      'Ownership progress visualisation as a primary tenant dashboard feature',
      'Simplified onboarding that does not require extensive documentation to begin',
      'Agreement timeline view to make rent-to-own terms visible and understandable',
      'Dual-interface approach serving both tenant and landlord workflows',
      'Plain language across all interfaces, avoiding financial and legal jargon',
    ],
    deliverables: [
      'Product concept definition and scope',
      'User flow diagrams for tenant and landlord journeys',
      'Mobile-first wireframes',
      'High-fidelity UI screens for tenant dashboard, property search and agreement management',
      'Interactive prototype for the core tenant journey',
    ],
    role:
      'Product Designer. Responsible for product concept development, user flow design, UI design and prototype production.',
    limitations:
      'Lelwapa SA is a product design concept. It has not been validated with real tenants or landlords, tested in a live environment or developed into a functional application. The legal and financial frameworks relevant to rent-to-own in South Africa have not been formally incorporated into the design. No commercial deployment has occurred.',
    nextSteps:
      'Validation interviews with prospective tenants and landlords in the South African market, legal and compliance review of the rent-to-own framework, technical architecture definition and a pilot programme with a property owner willing to offer the first rent-to-own pathway through the platform.',
  },
  {
    slug: 'mzansi-pay',
    title: 'Mzansi Pay',
    subtitle: 'Accessible Fintech & Payments',
    categories: ['Fintech', 'Product Design'],
    maturity: 'Concept',
    tagline: 'Financial access for South Africans who are left out of the formal banking system.',
    accentColor: '#5B8EF0',
    coverBg: 'from-[#08101f] to-[#0B0B0C]',
    overview:
      'Mzansi Pay is a product design concept for a financial access platform focused on accessible grant-related payment and digital wallet experiences for South Africans who are underserved by the formal financial system. The project explored how design could reduce barriers to accessing government grants, managing payments and building financial resilience.',
    problem:
      'Millions of South Africans receive government grants but face significant friction in accessing and managing those payments. Long queues, reliance on physical payment points, limited digital access and the complexity of formal banking products create real barriers. The product opportunity is to meet people where they are — on their phones, in their language, without requiring them to navigate systems designed for people with existing financial infrastructure.',
    audience:
      'Primary: South African grant recipients and low-income earners who have limited or no access to formal banking products. The design accounted for varying digital literacy, limited data budgets, lower-end smartphone use and preference for certain languages. Secondary: Community-based organisations that support grant recipients in managing their finances.',
    strategy:
      'The product strategy prioritised simplicity, trust and immediate utility. The platform needed to do a small number of things very well: show available balance, facilitate payments and transfers, and provide a record of transactions. Anything that added complexity without serving a clear user need was excluded from the MVP scope. The tone and language of the product was designed to be non-patronising and familiar.',
    designApproach:
      'A data-light design approach was chosen — minimal visual weight, optimised for slower connections. The interface used familiar metaphors from mobile money experiences that users already understand. Typography was large and clear. Contrast was high. The colour system used accessible combinations. Onboarding was designed to require minimal documentation to get started.',
    keyDecisions: [
      'Data-light design with minimal image use and optimised asset sizes',
      'Large touch targets and clear typography for accessibility across device types',
      'Transaction history as a primary feature — giving users a record they can trust',
      'Simplified onboarding with progressive identity verification to reduce initial friction',
      'South African language support considered in the content model',
      'Offline state handling for unreliable connection contexts',
    ],
    deliverables: [
      'Product concept and scope definition',
      'User flow mapping for grant access, wallet and payment journeys',
      'Low-fidelity wireframes',
      'High-fidelity mobile UI screens',
      'Interactive prototype for the core payment journey',
      'Accessibility and data-light design notes',
    ],
    role:
      'Product Designer. Responsible for product concept, user flow design, UI design and prototype production.',
    limitations:
      'Mzansi Pay is a product design concept. It has not been validated with grant recipients, tested with financial service providers, reviewed by compliance specialists or developed into a functional application. No financial licensing, SARB compliance or regulatory review has been conducted. The platform has not been commercially deployed.',
    nextSteps:
      'User research with grant recipients in the South African market, regulatory and compliance review for payment services, partnership exploration with a financial service provider, and technical architecture for the payment and wallet infrastructure.',
  },
  {
    slug: 'aurora-creative-studio',
    title: 'Aurora Creative Studio',
    subtitle: 'Brand Identity & Digital Experience',
    categories: ['Brand Identity', 'Creative Strategy'],
    maturity: 'Prototype',
    tagline: 'A creative studio identity built to communicate craft, confidence and originality.',
    accentColor: '#C084FC',
    coverBg: 'from-[#160f1f] to-[#0B0B0C]',
    overview:
      'Aurora Creative Studio is a brand identity and digital experience project for a creative studio positioning itself at the intersection of art direction, visual storytelling and digital production. The engagement covered brand strategy, visual identity and the design of a portfolio-led digital presence.',
    problem:
      'Aurora had strong creative capability but a brand identity that did not reflect it. Their existing visual presence was generic — using template-based assets and inconsistent visual language across different touchpoints. Prospective clients could not get a clear sense of Aurora\'s aesthetic perspective or creative approach from their public presence. The challenge was to design an identity and digital experience that communicated creative confidence without being inaccessible or overly conceptual.',
    audience:
      'Primary: Marketing leads, brand managers and creative directors at businesses seeking a studio partner for campaigns, brand projects and digital experiences. Secondary: Independent artists, musicians and cultural organisations looking for a creative collaborator.',
    strategy:
      'The brand strategy positioned Aurora as a studio with a distinct point of view — not a generalist creative agency but a studio with a recognisable aesthetic and a selective approach to its work. The identity needed to communicate craft and confidence, and the digital presence needed to let the work speak first, with supporting content that reinforced Aurora\'s perspective and process.',
    designApproach:
      'The visual identity was built around strong typographic expression, a controlled colour palette and an editorial grid system. The wordmark combined a contemporary sans-serif with deliberate spacing — legible and distinct without being decorative. The digital experience was designed around the work — large, high-quality project presentations with a minimal surrounding interface that did not compete with the creative output. A dark-mode default was chosen to give the portfolio work maximum visual impact.',
    keyDecisions: [
      'Typographic wordmark chosen over symbol-based logo to communicate modernity and craft',
      'Dark-mode digital presence to give project work maximum visual impact',
      'Editorial grid system to create rhythm and intentionality across the site',
      'Project-first information architecture — work visible immediately, without navigation overhead',
      'Controlled accent colour used sparingly to create emphasis without visual noise',
      'Motion used minimally and purposefully — entrance transitions only, no decorative animation',
    ],
    deliverables: [
      'Brand strategy and positioning document',
      'Wordmark and logotype',
      'Colour palette and typography system',
      'Brand guidelines',
      'Website design — homepage, project pages and about section',
      'Digital asset set for web and social use',
    ],
    role:
      'Brand Designer and Creative Director. Responsible for brand strategy, identity design, visual system and website design.',
    limitations:
      'Aurora Creative Studio is a brand identity and website design project. The digital experience shown represents a design prototype, not a live-deployed website. The project outcomes are based on the design brief and creative direction, not measured audience response or commercial performance data.',
    nextSteps:
      'Front-end development of the website design, production photography for the portfolio section, and a content strategy for the Insights section.',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 2): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
