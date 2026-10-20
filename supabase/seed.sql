-- =============================================================================
-- KHULA WEBSITE — Seed Data
-- Populated from: src/data/projects.ts, services.ts, packages.ts, articles.ts
-- Run automatically on: supabase db reset
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Disable triggers during seed for speed; re-enable after
-- ---------------------------------------------------------------------------
set session_replication_role = replica;


-- ===========================================================================
-- PROJECTS
-- ===========================================================================

insert into public.projects (
  slug, title, subtitle, categories, maturity, tagline,
  overview, problem, audience, strategy, design_approach,
  key_decisions, deliverables, role, limitations, next_steps,
  accent_color, cover_bg, sort_order, published
) values

(
  'regen-rail',
  'REGEN RAIL',
  'Railway Infrastructure Monitoring',
  array['Infrastructure Technology','Product Design']::project_category[],
  'Prototype',
  'Predictive maintenance and monitoring for railway infrastructure.',
  'REGEN RAIL is a product design exploration for a railway infrastructure monitoring and predictive maintenance platform. The project addressed a critical gap in how railway operators manage track integrity, asset health and maintenance workflows — shifting from reactive maintenance to proactive, data-informed operations.',
  'Railway infrastructure teams face a persistent challenge: critical maintenance decisions are made reactively, after incidents occur, rather than proactively. Monitoring systems, where they exist, are fragmented — data lives in disconnected tools, inspection reports are manual and paper-based, and there is no single view of asset health across a network. The result is delayed responses, increased risk and inefficient allocation of maintenance resources.',
  'The primary users are infrastructure operations managers and maintenance engineers responsible for track condition, asset health and maintenance scheduling. Secondary users include safety and compliance officers who need audit trails and incident records.',
  'The product strategy focused on three priorities: consolidating monitoring data into a single operational view, surfacing alerts that require human attention rather than overwhelming users with raw data, and creating workflow tools that connect inspection findings to maintenance actions. The design prioritised clarity and speed — operators needed to identify and act on issues quickly, not navigate complex dashboards.',
  'The interface was designed around an operational control-room mental model — a persistent overview of network status with progressive disclosure into section-level and asset-level detail. Alert management was treated as a primary workflow, not a secondary panel. A dark-mode interface was chosen to reduce eye strain in low-light monitoring environments and to give the product a distinctive, technical character appropriate to its industrial context.',
  array[
    'Dark-mode interface chosen for operational contexts and visual clarity of status indicators',
    'Map-based network overview as the primary entry point, replacing tabular asset lists',
    'Alert severity system with three levels (critical, warning, informational) to prevent alert fatigue',
    'Maintenance workflow linked directly from alerts to reduce friction in acting on findings',
    'Role-based views designed for operations managers versus field engineers',
    'Asset relationship model to connect track sections, infrastructure components and inspection records'
  ],
  array[
    'Product scope definition and feature prioritisation',
    'User flow diagrams for primary monitoring and maintenance workflows',
    'Information architecture for the asset and alert model',
    'High-fidelity UI screens for the dashboard, network map, alert management and maintenance workflow',
    'Interactive Figma prototype covering the core operator journey',
    'Design system components for the monitoring interface'
  ],
  'Product Designer and UX Architect. Responsible for product strategy, user flow design, information architecture, UI design and prototype production.',
  'REGEN RAIL is a product design prototype. It has not been commercially deployed, validated with railway operators in a live environment, or integrated with real infrastructure monitoring hardware. The data and alert models are representative rather than based on a specific technical implementation.',
  'User research with actual railway operations teams to validate the alert model and workflow assumptions, technical architecture definition for real-time data integration, and a pilot with a maintenance operations team to test the interface in a real monitoring context.',
  '#3FAF72',
  'from-[#0d1f14] to-[#0B0B0C]',
  1,
  true
),

(
  'lelwapa-sa',
  'Lelwapa SA',
  'Rent-to-Own Housing Platform',
  array['PropTech','Product Design']::project_category[],
  'Concept',
  'Making the path to homeownership clearer and more accessible.',
  'Lelwapa SA is a product design concept for a rent-to-own housing platform connecting tenants and landlords in the South African property market. The project explored how digital product design could reduce the opacity, complexity and inaccessibility that characterise the rent-to-own pathway for many South Africans.',
  'For many South Africans, homeownership feels distant — not because of a lack of aspiration but because the pathway is unclear, institutional barriers are high and available mechanisms like rent-to-own are poorly understood and inconsistently applied. Tenants lack visibility into whether their rent is building toward ownership. Landlords and property owners lack accessible tools for managing rent-to-own agreements. The result is a market opportunity that is under-served by existing technology.',
  'Primary: South African tenants who want to build toward homeownership but cannot access traditional mortgage financing in the short term. Secondary: Property owners and landlords who want to offer flexible ownership pathways. The design considered lower-income and first-time-buyer demographics, where digital literacy and device constraints are relevant design factors.',
  'The product strategy centred on transparency and progress visibility — giving tenants a clear understanding of their ownership journey, their payment history and what they need to do next. For landlords, the strategy focused on simplifying agreement management, payment tracking and documentation. Trust was treated as a core product value: the platform needed to feel credible and fair to both parties.',
  'The interface was designed to be accessible across device types, with a mobile-first approach reflecting the South African context where smartphone access dominates. The visual language was warm, approachable and human — deliberately distinct from the cold, institutional tone of banking and property platforms. Plain language was prioritised over technical terminology.',
  array[
    'Mobile-first design reflecting South African smartphone access patterns',
    'Ownership progress visualisation as a primary tenant dashboard feature',
    'Simplified onboarding that does not require extensive documentation to begin',
    'Agreement timeline view to make rent-to-own terms visible and understandable',
    'Dual-interface approach serving both tenant and landlord workflows',
    'Plain language across all interfaces, avoiding financial and legal jargon'
  ],
  array[
    'Product concept definition and scope',
    'User flow diagrams for tenant and landlord journeys',
    'Mobile-first wireframes',
    'High-fidelity UI screens for tenant dashboard, property search and agreement management',
    'Interactive prototype for the core tenant journey'
  ],
  'Product Designer. Responsible for product concept development, user flow design, UI design and prototype production.',
  'Lelwapa SA is a product design concept. It has not been validated with real tenants or landlords, tested in a live environment or developed into a functional application. The legal and financial frameworks relevant to rent-to-own in South Africa have not been formally incorporated into the design.',
  'Validation interviews with prospective tenants and landlords in the South African market, legal and compliance review of the rent-to-own framework, technical architecture definition and a pilot programme with a property owner willing to offer the first rent-to-own pathway through the platform.',
  '#F5A623',
  'from-[#1f1508] to-[#0B0B0C]',
  2,
  true
),

(
  'mzansi-pay',
  'Mzansi Pay',
  'Accessible Fintech & Payments',
  array['Fintech','Product Design']::project_category[],
  'Concept',
  'Financial access for South Africans who are left out of the formal banking system.',
  'Mzansi Pay is a product design concept for a financial access platform focused on accessible grant-related payment and digital wallet experiences for South Africans who are underserved by the formal financial system. The project explored how design could reduce barriers to accessing government grants, managing payments and building financial resilience.',
  'Millions of South Africans receive government grants but face significant friction in accessing and managing those payments. Long queues, reliance on physical payment points, limited digital access and the complexity of formal banking products create real barriers. The product opportunity is to meet people where they are — on their phones, in their language, without requiring them to navigate systems designed for people with existing financial infrastructure.',
  'Primary: South African grant recipients and low-income earners who have limited or no access to formal banking products. The design accounted for varying digital literacy, limited data budgets, lower-end smartphone use and preference for certain languages. Secondary: Community-based organisations that support grant recipients in managing their finances.',
  'The product strategy prioritised simplicity, trust and immediate utility. The platform needed to do a small number of things very well: show available balance, facilitate payments and transfers, and provide a record of transactions. Anything that added complexity without serving a clear user need was excluded from the MVP scope. The tone and language of the product was designed to be non-patronising and familiar.',
  'A data-light design approach was chosen — minimal visual weight, optimised for slower connections. The interface used familiar metaphors from mobile money experiences that users already understand. Typography was large and clear. Contrast was high. The colour system used accessible combinations. Onboarding was designed to require minimal documentation to get started.',
  array[
    'Data-light design with minimal image use and optimised asset sizes',
    'Large touch targets and clear typography for accessibility across device types',
    'Transaction history as a primary feature — giving users a record they can trust',
    'Simplified onboarding with progressive identity verification to reduce initial friction',
    'South African language support considered in the content model',
    'Offline state handling for unreliable connection contexts'
  ],
  array[
    'Product concept and scope definition',
    'User flow mapping for grant access, wallet and payment journeys',
    'Low-fidelity wireframes',
    'High-fidelity mobile UI screens',
    'Interactive prototype for the core payment journey',
    'Accessibility and data-light design notes'
  ],
  'Product Designer. Responsible for product concept, user flow design, UI design and prototype production.',
  'Mzansi Pay is a product design concept. It has not been validated with grant recipients, tested with financial service providers, reviewed by compliance specialists or developed into a functional application. No financial licensing, SARB compliance or regulatory review has been conducted.',
  'User research with grant recipients in the South African market, regulatory and compliance review for payment services, partnership exploration with a financial service provider, and technical architecture for the payment and wallet infrastructure.',
  '#5B8EF0',
  'from-[#08101f] to-[#0B0B0C]',
  3,
  true
),

(
  'aurora-creative-studio',
  'Aurora Creative Studio',
  'Brand Identity & Digital Experience',
  array['Brand Identity','Creative Strategy']::project_category[],
  'Prototype',
  'A creative studio identity built to communicate craft, confidence and originality.',
  'Aurora Creative Studio is a brand identity and digital experience project for a creative studio positioning itself at the intersection of art direction, visual storytelling and digital production. The engagement covered brand strategy, visual identity and the design of a portfolio-led digital presence.',
  'Aurora had strong creative capability but a brand identity that did not reflect it. Their existing visual presence was generic — using template-based assets and inconsistent visual language across different touchpoints. Prospective clients could not get a clear sense of Aurora''s aesthetic perspective or creative approach from their public presence. The challenge was to design an identity and digital experience that communicated creative confidence without being inaccessible or overly conceptual.',
  'Primary: Marketing leads, brand managers and creative directors at businesses seeking a studio partner for campaigns, brand projects and digital experiences. Secondary: Independent artists, musicians and cultural organisations looking for a creative collaborator.',
  'The brand strategy positioned Aurora as a studio with a distinct point of view — not a generalist creative agency but a studio with a recognisable aesthetic and a selective approach to its work. The identity needed to communicate craft and confidence, and the digital presence needed to let the work speak first, with supporting content that reinforced Aurora''s perspective and process.',
  'The visual identity was built around strong typographic expression, a controlled colour palette and an editorial grid system. The wordmark combined a contemporary sans-serif with deliberate spacing — legible and distinct without being decorative. The digital experience was designed around the work — large, high-quality project presentations with a minimal surrounding interface that did not compete with the creative output. A dark-mode default was chosen to give the portfolio work maximum visual impact.',
  array[
    'Typographic wordmark chosen over symbol-based logo to communicate modernity and craft',
    'Dark-mode digital presence to give project work maximum visual impact',
    'Editorial grid system to create rhythm and intentionality across the site',
    'Project-first information architecture — work visible immediately, without navigation overhead',
    'Controlled accent colour used sparingly to create emphasis without visual noise',
    'Motion used minimally and purposefully — entrance transitions only, no decorative animation'
  ],
  array[
    'Brand strategy and positioning document',
    'Wordmark and logotype',
    'Colour palette and typography system',
    'Brand guidelines',
    'Website design — homepage, project pages and about section',
    'Digital asset set for web and social use'
  ],
  'Brand Designer and Creative Director. Responsible for brand strategy, identity design, visual system and website design.',
  'Aurora Creative Studio is a brand identity and website design project. The digital experience shown represents a design prototype, not a live-deployed website. The project outcomes are based on the design brief and creative direction, not measured audience response or commercial performance data.',
  'Front-end development of the website design, production photography for the portfolio section, and a content strategy for the Insights section.',
  '#C084FC',
  'from-[#160f1f] to-[#0B0B0C]',
  4,
  true
);


-- ===========================================================================
-- SERVICES
-- ===========================================================================

insert into public.services (
  slug, name, category, billing_type, starting_price,
  short_description, description,
  problems_solved, suitable_for, deliverables, process,
  faqs, related_project_slugs, sort_order, published
) values

-- ── Product & UX ─────────────────────────────────────────────────────────────

(
  'ui-ux-design',
  'UI/UX Design',
  'Product & UX',
  'once-off',
  6500,
  'Interfaces designed for people — clear, intuitive and built to convert.',
  'Good interface design is invisible. It guides users towards outcomes without friction, confusion or cognitive overload. KHULA approaches UI/UX design as a combination of visual craft, interaction logic and user empathy — producing interfaces that work as well as they look.',
  array[
    'Users drop off because the interface is confusing or inconsistent',
    'The product looks dated and undermines trust',
    'There is no coherent design language across screens',
    'Development is blocked waiting for design decisions'
  ],
  array[
    'Startups building their first digital product',
    'Businesses redesigning an existing web or mobile application',
    'Teams that need a design system to hand off to developers',
    'Founders who want to validate an idea before committing to full development'
  ],
  array[
    'User flow diagrams',
    'Wireframes and low-fidelity prototypes',
    'High-fidelity UI screens',
    'Component library or design system',
    'Clickable prototype for stakeholder review',
    'Developer handoff documentation'
  ],
  array[
    'Understand the product, users and business objectives',
    'Map user flows and identify friction points',
    'Sketch and wireframe key screens',
    'Design high-fidelity interfaces aligned to the brand',
    'Prototype for review and iteration',
    'Prepare handoff assets for development'
  ],
  '[
    {"question": "Do you design for mobile and desktop?", "answer": "Yes. Designs are produced for the breakpoints relevant to your product. Responsive behaviour is considered and documented as part of the handoff."},
    {"question": "Can you design within an existing brand?", "answer": "Yes. If a brand guide or existing style is in place, designs will align to it. If the brand needs development, that can be scoped separately."},
    {"question": "What tools do you use?", "answer": "Figma is the primary design tool. Prototypes and design systems are also delivered in Figma."}
  ]'::jsonb,
  array['regen-rail','mzansi-pay'],
  1, true
),

(
  'product-design',
  'Product Design',
  'Product & UX',
  'once-off',
  12000,
  'End-to-end product thinking — from problem definition to designed solution.',
  'Product design is more than screens. It is the discipline of understanding a problem deeply, defining the right solution and designing an experience that achieves measurable outcomes. KHULA brings a founder-level perspective to product design — balancing user needs, business goals and technical realities.',
  array[
    'The team has a feature idea but no clear product direction',
    'The product exists but users are not engaging with key functionality',
    'There is no coherent experience across the product''s flows',
    'Design and development are misaligned, causing rework and delay'
  ],
  array[
    'Early-stage startups designing their core product',
    'Scaleups redesigning a product that has grown without design direction',
    'Organisations digitising manual processes',
    'Founders who need a design partner, not just a designer'
  ],
  array[
    'Product strategy document',
    'User research synthesis',
    'Information architecture',
    'End-to-end user flows',
    'Wireframes and high-fidelity screens',
    'Interactive prototype',
    'Design system foundations',
    'Developer handoff with component specifications'
  ],
  array[
    'Product discovery — understand the business, users and competitive context',
    'Define the product scope, success criteria and design principles',
    'Map information architecture and user journeys',
    'Design and prototype key flows',
    'Review and refine through structured feedback',
    'Deliver handoff-ready assets with documentation'
  ],
  '[
    {"question": "Is product design the same as UI/UX design?", "answer": "Product design is broader. It includes strategy, information architecture, user research and system thinking — in addition to interface design. It is appropriate when you need end-to-end design thinking, not just screen-level polish."},
    {"question": "Do you work with development teams?", "answer": "Yes. KHULA can work alongside your engineering team, provide design specifications and participate in handoff and review processes."}
  ]'::jsonb,
  array['regen-rail','lelwapa-sa'],
  2, true
),

(
  'ux-research-strategy',
  'UX Research & Strategy',
  'Product & UX',
  'once-off',
  5000,
  'Understand your users before you build. Research that shapes better decisions.',
  'Building the wrong thing is expensive. UX research reduces that risk by grounding product decisions in real user behaviour, needs and context. KHULA conducts research appropriate to the project''s stage — from exploratory discovery to evaluative usability testing.',
  array[
    'The team is building based on assumptions rather than evidence',
    'Users are not adopting the product as expected',
    'Stakeholders cannot agree on what to build next',
    'The existing product has usability problems that need diagnosing'
  ],
  array[
    'Teams before a major product investment',
    'Businesses redesigning an existing product',
    'Organisations that have never formally researched their users',
    'Founders validating a concept before development'
  ],
  array[
    'Research plan and discussion guides',
    'User interview synthesis',
    'Usability testing report',
    'Insight and opportunity summary',
    'Persona or user archetype documentation',
    'Strategic recommendations'
  ],
  array[
    'Define research objectives and questions',
    'Plan appropriate research methods',
    'Conduct interviews, observation or usability sessions',
    'Synthesise findings into actionable insights',
    'Present recommendations and design implications'
  ],
  '[
    {"question": "Do you recruit research participants?", "answer": "Participant recruitment can be included in scope, depending on the target audience and availability. For some contexts, research is conducted with clients'' existing user bases."},
    {"question": "Can research be combined with a design project?", "answer": "Yes. Research is typically most valuable when it directly informs design. Combined engagements can be scoped accordingly."}
  ]'::jsonb,
  array['regen-rail'],
  3, true
),

(
  'mvp-design-prototyping',
  'MVP Design & Prototyping',
  'Product & UX',
  'once-off',
  15000,
  'Test your core idea with a designed, clickable prototype — before writing code.',
  'An MVP is not just a minimal product — it is a deliberate test of your most important assumptions. KHULA designs MVPs that focus attention on the highest-value user journeys, validate product thinking with real users and give development teams a clear, designed spec to build from.',
  array[
    'Stakeholders cannot align on what the product should do first',
    'Investment or development is needed but there is no visual spec',
    'The team wants to test the concept with users before building',
    'The first version of the product needs to work well, not just exist'
  ],
  array[
    'Founders preparing for a seed or pre-seed raise',
    'Teams about to commission a development build',
    'Organisations piloting a new digital service',
    'Businesses replacing a manual process with a digital product'
  ],
  array[
    'Product scope definition',
    'Core user flow mapping',
    'Wireframe set',
    'High-fidelity MVP screen designs',
    'Interactive Figma prototype',
    'User testing summary (scope-dependent)',
    'Developer handoff documentation'
  ],
  array[
    'Define the MVP scope — what is being tested and why',
    'Map the minimum required user journeys',
    'Design and prototype the core experience',
    'Test with representative users where possible',
    'Refine and prepare for handoff or further development'
  ],
  '[
    {"question": "Is development included?", "answer": "MVP Design & Prototyping covers the design, information architecture and clickable prototype. Development can be scoped separately or handed off to a development team."},
    {"question": "How many screens are typically included?", "answer": "This depends on the product''s complexity. The focus is on the journeys required to test the core value proposition, not completeness."}
  ]'::jsonb,
  array['mzansi-pay','lelwapa-sa'],
  4, true
),

-- ── Web & Digital ─────────────────────────────────────────────────────────────

(
  'website-design-build',
  'Website Design & Build',
  'Web & Digital',
  'once-off',
  12000,
  'Designed and built websites that do real business work — not just brochures.',
  'A website is often the first and most lasting impression a business makes. KHULA designs and builds websites that communicate clearly, convert visitors into enquiries or customers and reflect the quality of the business they represent.',
  array[
    'The existing website no longer reflects the business or its offering',
    'The website is not generating enquiries or leads',
    'The site does not work well on mobile',
    'The business has outgrown a template-based solution'
  ],
  array[
    'Businesses launching or relaunching their digital presence',
    'Startups that need a professional website to accompany a product launch',
    'Professional service firms that need a credible, content-led website',
    'Creative studios, agencies and consultancies'
  ],
  array[
    'UX and content strategy',
    'Page designs for all key sections',
    'Responsive, accessible front-end build',
    'CMS integration (scope-dependent)',
    'Basic SEO foundations',
    'Performance optimisation',
    'Deployment support'
  ],
  array[
    'Define the website''s goals, audience and content requirements',
    'Design key page layouts and the visual system',
    'Build the responsive front-end',
    'Integrate CMS if required',
    'Test across devices and browsers',
    'Deploy and hand over'
  ],
  '[
    {"question": "Does this include hosting?", "answer": "Hosting is not included in the design and build fee. Recommendations are provided for suitable hosting options. Third-party costs are always separate."},
    {"question": "Can I update the website myself after it is built?", "answer": "Yes, if a CMS is included in scope. The approach depends on the type of website and how frequently content is expected to change."}
  ]'::jsonb,
  array['aurora-creative-studio'],
  5, true
),

-- ── Brand & Creative ─────────────────────────────────────────────────────────

(
  'brand-identity',
  'Brand Identity',
  'Brand & Creative',
  'once-off',
  8500,
  'A brand identity that communicates who you are before you say a word.',
  'Brand identity is the visual and verbal system that makes a business recognisable, memorable and credible. KHULA approaches brand identity as a strategic exercise — starting from business positioning and audience understanding before designing the visual expression.',
  array[
    'The business has no consistent visual identity',
    'The existing brand no longer reflects the business''s direction',
    'Different materials look like they came from different organisations',
    'The brand does not communicate credibility or differentiation'
  ],
  array[
    'New businesses establishing their identity',
    'Established businesses repositioning or rebranding',
    'Founders who want a brand that reflects their ambition',
    'Creative studios, service firms and product companies'
  ],
  array[
    'Brand strategy and positioning brief',
    'Logomark and logotype',
    'Colour palette and typography system',
    'Brand guidelines document',
    'Application examples',
    'Digital and print asset files'
  ],
  array[
    'Brand discovery — understand the business, positioning and audience',
    'Develop the brand strategy and creative direction',
    'Design and present identity concepts',
    'Refine the selected direction',
    'Produce guidelines and final asset files'
  ],
  '[
    {"question": "How many logo concepts will I receive?", "answer": "The number of concepts presented is defined in the project proposal. The focus is on quality and strategic fit rather than quantity."},
    {"question": "What file formats are delivered?", "answer": "Final assets are delivered in vector formats (SVG, PDF) and rasterised files (PNG) at appropriate sizes for digital and print use."}
  ]'::jsonb,
  array['aurora-creative-studio'],
  6, true
),

(
  'creative-direction',
  'Creative Direction',
  'Brand & Creative',
  'once-off',
  7500,
  'Creative leadership that ensures your visual output is coherent and considered.',
  'Creative direction shapes how a brand or product looks and feels across every touchpoint. KHULA provides creative direction for campaigns, digital products, brand refreshes and content productions — ensuring that the visual output reflects the strategy and speaks to the right audience.',
  array[
    'Creative output is inconsistent across channels',
    'The team lacks a strategic creative perspective',
    'A campaign or launch needs a strong, unified visual concept',
    'The brand needs to evolve but risks losing coherence'
  ],
  array[
    'Brands planning a campaign or launch',
    'Teams that need senior creative oversight without a full-time hire',
    'Businesses developing marketing or content at scale'
  ],
  array[
    'Creative brief and concept development',
    'Visual direction and mood board',
    'Art direction for photography, video or illustration',
    'Review and feedback on production outputs',
    'Creative standards documentation'
  ],
  array[
    'Creative brief — understand objectives, audience and context',
    'Develop concepts and present visual direction',
    'Guide production through review and feedback',
    'Ensure consistency across deliverables'
  ],
  '[
    {"question": "Do you manage production teams?", "answer": "Creative direction can include working with photographers, illustrators and content teams. The scope of coordination is agreed in advance."}
  ]'::jsonb,
  array['aurora-creative-studio'],
  7, true
),

-- ── Strategy & Growth ─────────────────────────────────────────────────────────

(
  'digital-strategy',
  'Digital Strategy',
  'Strategy & Growth',
  'once-off',
  5000,
  'A clear digital direction that connects your business goals to actionable plans.',
  'Many businesses invest in digital without a coherent strategy. KHULA develops digital strategies that are grounded in business objectives, audience insight and realistic execution — giving teams a clear direction rather than a list of tactics.',
  array[
    'The business is spending on digital without a clear plan',
    'Different channels are operating in silos without a shared objective',
    'Leadership cannot agree on digital priorities',
    'The business needs to enter a new digital channel or market'
  ],
  array[
    'Businesses planning their first meaningful digital investment',
    'Organisations reviewing their digital presence and performance',
    'Founders who want to align product, brand and marketing before executing'
  ],
  array[
    'Digital audit and opportunity assessment',
    'Strategic recommendations',
    'Channel and capability priorities',
    'Measurement framework',
    'Execution roadmap'
  ],
  array[
    'Audit the current digital presence and performance',
    'Identify the business objectives and audience context',
    'Define strategic priorities and channel approach',
    'Develop the roadmap and success metrics',
    'Present and align with stakeholders'
  ],
  '[
    {"question": "Does this include implementation?", "answer": "Digital Strategy is a standalone advisory service. Implementation of recommendations can be scoped separately through relevant service or package engagements."}
  ]'::jsonb,
  array[]::text[],
  8, true
),

-- ── Marketing & Performance ───────────────────────────────────────────────────

(
  'digital-marketing',
  'Digital Marketing',
  'Marketing & Performance',
  'monthly',
  6000,
  'Integrated digital marketing that builds visibility and drives measurable results.',
  'Digital marketing at KHULA is not a set of disconnected tactics. It is a coordinated effort across relevant channels, guided by strategy and measured against business outcomes. The approach is defined by the scope agreed for each engagement.',
  array[
    'The business is not visible to its target audience online',
    'Marketing spend is not producing measurable results',
    'The team is executing without a clear plan or consistent message'
  ],
  array[
    'Businesses building or growing their online presence',
    'Startups that need marketing support from an early stage',
    'Established businesses entering new digital channels'
  ],
  array[
    'Marketing plan aligned to business objectives',
    'Channel-specific execution',
    'Performance reporting',
    'Creative asset production (scope-dependent)'
  ],
  array[
    'Define objectives, audience and channel strategy',
    'Agree scope, deliverables and measurement approach',
    'Execute across agreed channels',
    'Report performance and refine approach monthly'
  ],
  '[
    {"question": "Is advertising spend included?", "answer": "No. Advertising spend is always separate from management fees. The budget allocated to paid media is agreed and managed transparently."}
  ]'::jsonb,
  array[]::text[],
  9, true
),

(
  'social-media-management',
  'Social Media Management',
  'Marketing & Performance',
  'monthly',
  5500,
  'Consistent, considered social media presence — managed on your behalf.',
  'Social media management at KHULA covers content planning, creation, publishing and community engagement across the platforms agreed in scope. The approach is adapted to each client''s brand, audience and business objectives.',
  array[
    'The business has inconsistent or absent social media presence',
    'The team does not have capacity to manage social media well',
    'Content is generic and not generating engagement',
    'There is no coherent content strategy across platforms'
  ],
  array[
    'Businesses that need social media managed consistently',
    'Brands building an audience in the South African market',
    'Founders who want to focus on the business, not the content calendar'
  ],
  array[
    'Monthly content calendar',
    'Content creation and scheduling',
    'Community management',
    'Monthly performance summary'
  ],
  array[
    'Understand the brand voice, audience and objectives',
    'Develop a content strategy and monthly calendar',
    'Produce and schedule content',
    'Monitor engagement and report monthly'
  ],
  '[
    {"question": "Which platforms are included?", "answer": "Platforms are agreed as part of the scope. Typical options include Instagram, LinkedIn, Facebook and X. The appropriate mix depends on the audience and objectives."},
    {"question": "How many posts per month?", "answer": "The publishing frequency is defined in the scope. It depends on the platform mix, content type and budget."}
  ]'::jsonb,
  array[]::text[],
  10, true
),

(
  'social-content',
  'Social + Content',
  'Marketing & Performance',
  'monthly',
  8500,
  'Social media management combined with original content production.',
  'Social + Content combines community management with original content creation — articles, short-form video, graphics and copy — produced to a strategy and published consistently across agreed channels.',
  array[
    'The business needs both content creation and channel management',
    'Social output lacks quality or strategic alignment',
    'The team has no capacity for regular original content'
  ],
  array[
    'Businesses investing seriously in content-led growth',
    'Brands that need professional content production at scale',
    'Organisations building thought leadership or community'
  ],
  array[
    'Content strategy and monthly calendar',
    'Original content production (graphics, copy, short-form video)',
    'Channel management and scheduling',
    'Engagement and performance reporting'
  ],
  array[
    'Define content pillars, audience and tone',
    'Develop content calendar and production plan',
    'Produce and publish content across channels',
    'Review performance and adapt quarterly'
  ],
  '[
    {"question": "What content formats are included?", "answer": "The content mix is agreed in scope. Typical formats include static graphics, carousels, copy-led posts and short-form video depending on the platform."}
  ]'::jsonb,
  array[]::text[],
  11, true
),

(
  'meta-ads-management',
  'Meta Ads Management',
  'Marketing & Performance',
  'once-off',
  4500,
  'Meta advertising campaigns managed to reach your audience and drive results.',
  'Meta Ads Management covers campaign strategy, creative briefing, audience setup, campaign management and performance optimisation across Facebook and Instagram. Advertising spend is separate from the management fee.',
  array[
    'Meta campaigns are running but not producing measurable results',
    'The business needs to reach a specific audience on Meta platforms',
    'Campaign creative and targeting need professional management'
  ],
  array[
    'Businesses running or planning Meta advertising campaigns',
    'E-commerce brands targeting South African consumers',
    'Businesses promoting a product launch, event or offer'
  ],
  array[
    'Campaign strategy and audience brief',
    'Ad creative direction and copy',
    'Campaign setup and management',
    'Performance reporting'
  ],
  array[
    'Define campaign objectives and target audience',
    'Develop campaign strategy and creative brief',
    'Set up and launch campaigns',
    'Optimise based on performance data',
    'Report results against agreed objectives'
  ],
  '[
    {"question": "Is advertising spend included?", "answer": "No. Advertising spend is paid directly to Meta and is always separate from the management fee."}
  ]'::jsonb,
  array[]::text[],
  12, true
),

(
  'google-ads-management',
  'Google Ads Management',
  'Marketing & Performance',
  'once-off',
  5000,
  'Google Ads campaigns that reach high-intent audiences at the moment of search.',
  'Google Ads Management covers keyword strategy, campaign setup, ad copy, bid management and performance optimisation across Search and Display. Advertising spend is separate from the management fee.',
  array[
    'The business needs to appear at the top of search results for relevant queries',
    'Existing campaigns are generating clicks but not conversions',
    'Google Ads is running without a coherent keyword or bid strategy'
  ],
  array[
    'Businesses with products or services that are actively searched for',
    'Organisations running time-sensitive campaigns',
    'Businesses entering a competitive market where organic reach takes time'
  ],
  array[
    'Keyword and campaign strategy',
    'Ad copy and extensions',
    'Campaign setup and management',
    'Performance reporting'
  ],
  array[
    'Keyword research and competitive analysis',
    'Campaign and ad group structure',
    'Write ad copy and configure extensions',
    'Launch and optimise campaigns',
    'Regular performance reporting'
  ],
  '[
    {"question": "Is advertising spend included?", "answer": "No. Advertising spend is paid directly to Google and is always separate from the management fee."}
  ]'::jsonb,
  array[]::text[],
  13, true
),

(
  'seo',
  'SEO',
  'Marketing & Performance',
  'monthly',
  5500,
  'Sustainable organic visibility built on technical foundations and quality content.',
  'SEO at KHULA is a disciplined, long-term investment in organic search visibility. It covers technical SEO foundations, on-page optimisation and content strategy — building discoverability that compounds over time.',
  array[
    'The website is not appearing in relevant search results',
    'Organic traffic is flat or declining',
    'The website has technical issues affecting search performance',
    'Content is not aligned to how the target audience actually searches'
  ],
  array[
    'Businesses committed to organic search as a growth channel',
    'Companies with content-driven websites that are not reaching their audience',
    'Businesses preparing for a website launch or redesign'
  ],
  array[
    'Technical SEO audit',
    'Keyword research and content strategy',
    'On-page optimisation',
    'Content brief development',
    'Monthly performance reporting'
  ],
  array[
    'Audit technical foundations and current performance',
    'Develop keyword and content strategy',
    'Implement on-page optimisation',
    'Produce or brief content aligned to search intent',
    'Track rankings, traffic and conversions monthly'
  ],
  '[
    {"question": "How long before results are visible?", "answer": "SEO results are typically visible within three to six months, depending on the site''s current state, competition and the consistency of the work. SEO is a long-term investment, not a quick fix."}
  ]'::jsonb,
  array[]::text[],
  14, true
),

(
  'campaign-design',
  'Campaign Design',
  'Marketing & Performance',
  'once-off',
  6500,
  'Creative campaign design that makes your marketing visually distinct and memorable.',
  'Campaign Design covers the creative development of marketing campaigns — concept, visual identity, copy direction and production of assets across digital and print channels.',
  array[
    'Marketing campaigns lack a strong creative concept or visual system',
    'Assets across channels are inconsistent',
    'The campaign creative does not reflect the brand'
  ],
  array[
    'Businesses launching a product, service or offer',
    'Brands running seasonal or promotional campaigns',
    'Marketing teams that need external creative support'
  ],
  array[
    'Campaign concept and creative brief',
    'Visual identity for the campaign',
    'Digital and print asset production',
    'Copy direction'
  ],
  array[
    'Understand campaign objectives and audience',
    'Develop creative concept and visual direction',
    'Produce campaign assets',
    'Deliver production-ready files'
  ],
  '[
    {"question": "How many asset formats are included?", "answer": "Asset formats and quantities are agreed in the project scope before commencement."}
  ]'::jsonb,
  array[]::text[],
  15, true
),

(
  'marketing-presence',
  'Marketing Presence',
  'Marketing & Performance',
  'monthly',
  6000,
  'Establish and maintain a consistent, professional marketing presence across key channels.',
  'Marketing Presence is an entry-level monthly engagement covering the essential channels and activities required to maintain a credible, active marketing presence. It is appropriate for businesses that need consistent output without a large marketing budget.',
  array[
    'The business has no active marketing presence',
    'Marketing is reactive rather than planned',
    'The team lacks capacity to maintain consistent output'
  ],
  array[
    'Small businesses building their first active marketing presence',
    'Businesses that need a maintained presence while keeping costs controlled',
    'Startups in early stages that need to be visible and credible'
  ],
  array[
    'Monthly content calendar',
    'Social media posting and management',
    'Basic email marketing (scope-dependent)',
    'Monthly performance summary'
  ],
  array[
    'Agree channels, content mix and objectives',
    'Develop monthly content calendar',
    'Execute and publish across channels',
    'Report monthly'
  ],
  '[
    {"question": "What is the difference between Presence, Growth and Performance?", "answer": "Presence is for businesses establishing consistent visibility. Growth adds more active audience development. Performance focuses on conversion and ROI across paid and owned channels."}
  ]'::jsonb,
  array[]::text[],
  16, true
),

(
  'marketing-growth',
  'Marketing Growth',
  'Marketing & Performance',
  'monthly',
  12000,
  'A more active monthly marketing engagement focused on audience and lead growth.',
  'Marketing Growth is a mid-tier monthly engagement that combines content, social media, email and light paid activity to build an audience, generate leads and grow the business''s digital reach.',
  array[
    'The business needs more than a maintained presence — it needs to grow',
    'The marketing funnel is not generating enough leads',
    'Multiple channels need coordination under a single strategy'
  ],
  array[
    'Businesses ready to invest in meaningful marketing growth',
    'Companies with an established presence looking to scale',
    'Organisations that need marketing as a growth driver, not just a support function'
  ],
  array[
    'Growth strategy and monthly plan',
    'Multi-channel content and campaign execution',
    'Email marketing',
    'Light paid media management (ad spend separate)',
    'Lead generation tracking',
    'Monthly performance reporting'
  ],
  array[
    'Define growth objectives and channel mix',
    'Develop monthly plan aligned to objectives',
    'Execute across owned and paid channels',
    'Optimise based on performance data',
    'Report monthly'
  ],
  '[
    {"question": "Is advertising spend included?", "answer": "No. Any advertising spend is separate from the monthly management fee."}
  ]'::jsonb,
  array[]::text[],
  17, true
),

(
  'marketing-performance',
  'Marketing Performance',
  'Marketing & Performance',
  'monthly',
  18000,
  'Full-funnel marketing focused on measurable conversion and return on investment.',
  'Marketing Performance is a comprehensive monthly engagement covering strategy, content, paid media, SEO and analytics — with a focus on measurable business outcomes. It is appropriate for businesses committed to marketing as a core growth function.',
  array[
    'Marketing spend is not producing measurable returns',
    'The business needs integrated marketing across multiple channels',
    'Conversion rate and lead quality need improvement'
  ],
  array[
    'Businesses with meaningful marketing budgets seeking measurable ROI',
    'Companies competing in active digital markets',
    'Organisations that need senior marketing capability without a full-time head of marketing'
  ],
  array[
    'Full marketing strategy',
    'Content and campaign production',
    'Paid media management (ad spend separate)',
    'SEO implementation',
    'Analytics and conversion tracking',
    'Monthly performance report with recommendations'
  ],
  array[
    'Audit current marketing performance and channels',
    'Develop full-funnel strategy',
    'Execute across all agreed channels',
    'Optimise campaigns continuously',
    'Report against KPIs monthly'
  ],
  '[
    {"question": "Is advertising spend included?", "answer": "No. All advertising spend is separate from the management fee."}
  ]'::jsonb,
  array[]::text[],
  18, true
);


-- ===========================================================================
-- PACKAGES
-- ===========================================================================

insert into public.packages (
  slug, name, tagline, starting_price, billing_type, popular,
  inclusions, exclusions, scope_dependent, cta, sort_order, published
) values

(
  'start',
  'Start',
  'For early-stage ideas and focused digital or brand requirements.',
  7500,
  'once-off',
  false,
  array[
    'Initial discovery and project briefing',
    'A focused deliverable appropriate to the selected service',
    'Up to two rounds of revisions (as defined in proposal)',
    'Figma source files or equivalent design assets',
    'Basic handoff documentation'
  ],
  array[
    'Development or coding (unless selected as the service)',
    'Content writing or copyediting',
    'Hosting, domain registration or third-party service costs',
    'Advertising spend'
  ],
  array[
    'Exact deliverables are defined in the project proposal',
    'Revision rounds are agreed before commencement',
    'Timeline is confirmed based on project complexity'
  ],
  'Start with Start',
  1, true
),

(
  'build',
  'Build',
  'For businesses that need a more developed product, website or brand experience.',
  18000,
  'once-off',
  true,
  array[
    'Extended discovery and alignment workshop',
    'Multi-deliverable scope appropriate to the engagement',
    'Up to three rounds of revisions (as defined in proposal)',
    'Figma source files and design system foundations',
    'Detailed handoff documentation',
    'Post-delivery support period (scope-dependent)'
  ],
  array[
    'Content writing or copyediting (unless scoped)',
    'Hosting, domain registration or third-party service costs',
    'Advertising spend',
    'Ongoing maintenance unless agreed as a separate engagement'
  ],
  array[
    'The specific services included are agreed in the project proposal',
    'Revision rounds and timelines are confirmed before commencement',
    'Post-delivery support duration is defined in the proposal'
  ],
  'Start with Build',
  2, true
),

(
  'grow',
  'Grow',
  'For businesses seeking broader digital development, connected deliverables or a comprehensive growth engagement.',
  30000,
  'once-off',
  false,
  array[
    'Comprehensive discovery, research and alignment',
    'Cross-disciplinary scope spanning multiple service areas',
    'Senior creative and strategic direction throughout',
    'Full design system and documentation',
    'Detailed handoff with implementation guidance',
    'Post-delivery review and support period (scope-dependent)'
  ],
  array[
    'Content writing or copyediting (unless scoped)',
    'Hosting, domain registration or third-party service costs',
    'Advertising spend',
    'Ongoing maintenance unless agreed separately'
  ],
  array[
    'The precise scope and service mix are agreed in the project proposal',
    'Timeline and milestones are defined before commencement',
    'Post-delivery support is defined in the proposal'
  ],
  'Start with Grow',
  3, true
),

(
  'retainer',
  'KHULA Retainer',
  'Ongoing design, creative or digital support defined by an agreed monthly scope.',
  7500,
  'monthly',
  false,
  array[
    'A defined monthly scope of design, creative or digital work',
    'Priority access to KHULA capacity each month',
    'Monthly check-in and scope review',
    'Accumulated deliverables against the agreed scope'
  ],
  array[
    'Work outside the agreed monthly scope',
    'Advertising spend',
    'Third-party platform or tool costs'
  ],
  array[
    'The monthly scope is agreed before the engagement begins',
    'Scope can be reviewed and adjusted at agreed intervals',
    'Minimum engagement period is discussed at project commencement'
  ],
  'Enquire About a Retainer',
  4, true
);


-- ===========================================================================
-- ARTICLES
-- ===========================================================================

insert into public.articles (
  slug, title, intro, body, category, published_at, reading_time, featured, published
) values

(
  'product-design-for-early-stage-businesses',
  'What product design actually means for early-stage businesses',
  'Most early-stage businesses think they need a logo and a website. What they actually need is a designed product — and those are very different things.',
  '[
    {
      "paragraphs": [
        "There is a common pattern in how early-stage businesses approach design. They start with the visible: a logo, a colour scheme, a website that explains what they do. These things matter, but they are outputs of a thinking process that rarely happens explicitly — and when that process is skipped, the visual work ends up disconnected from the actual product the business is trying to build.",
        "Product design is the discipline that bridges that gap. It is not about making things look good. It is about making things work — for users, and for the business."
      ]
    },
    {
      "heading": "The product design process, simplified",
      "paragraphs": [
        "Product design starts with questions, not screens. Who are the users? What do they need to accomplish? What does the business need to happen? What are the constraints?",
        "Once those questions have real answers, the design work has a direction. Information architecture defines how the product is organised. User flows map how people move through it. Wireframes test the logic before visual decisions are made. High-fidelity screens come later — after the thinking.",
        "This sequence sounds obvious. But in practice, most early-stage businesses skip straight to screens because screens are tangible and exciting. The result is a product that looks finished but has not been thought through."
      ]
    },
    {
      "heading": "Why it matters for founders",
      "paragraphs": [
        "For founders, the investment in product design is not primarily aesthetic — it is commercial. A product that is confusing costs more to support. A product that does not serve the user''s actual need will not retain users. A product built without a design system will cost more to maintain and extend.",
        "The earlier product design thinking is applied, the cheaper it is to get right. Changes to information architecture at the wireframe stage cost hours. Changes after development has started cost weeks."
      ],
      "bullets": [
        "Design thinking before development reduces costly rework",
        "Clear user flows reduce support burden and onboarding friction",
        "A coherent design system makes the product easier to extend",
        "Validated assumptions reduce the risk of building the wrong thing"
      ]
    },
    {
      "heading": "What this looks like in practice",
      "paragraphs": [
        "For most early-stage businesses, the appropriate starting point is a product design sprint: a focused engagement that defines the problem, maps the core user journeys, designs the essential screens and produces a prototype that can be tested and handed off to development.",
        "This does not need to take months. A focused MVP design engagement can produce enough to begin building in four to six weeks. The key is to design for the core value proposition first — and leave everything else for later."
      ]
    }
  ]'::jsonb,
  'Product Design',
  '2024-09-15',
  7,
  true,
  true
),

(
  'mvp-planning-what-to-include',
  'MVP planning: how to decide what to include and what to leave out',
  'An MVP is not just a small product. It is a deliberate test of your most important assumptions. Getting the scope right is the hardest — and most valuable — part of the process.',
  '[
    {
      "paragraphs": [
        "The term MVP — minimum viable product — is widely used and widely misunderstood. In most cases, it becomes a shorthand for \"the first version of the product\", without the rigour of actually defining what is minimum, what is viable, and what the product is testing.",
        "The original meaning is more precise: an MVP is the smallest version of a product that allows a team to learn the most important thing they need to know before committing to further investment."
      ]
    },
    {
      "heading": "Defining the test",
      "paragraphs": [
        "Before deciding what to include in an MVP, the team needs to agree on what it is testing. What is the most important assumption the business is making? Is it that users will want this product? That they will pay for it? That a particular feature is the core value driver?",
        "The MVP should be designed to answer that question — not to demonstrate the full vision, not to impress potential investors with features, and not to be a feature-complete version of something that does not yet know its users."
      ]
    },
    {
      "heading": "The scope decision framework",
      "paragraphs": [
        "A useful exercise is to list every feature the team wants to include, then ask three questions for each: Does this feature test the core assumption? If we removed it, would the product still be able to test what we are trying to learn? If a user could not do this, would they abandon the product entirely?",
        "Features that survive all three questions stay. Features that fail the first question are deferred. Features that fail the second and third are candidates for the backlog."
      ],
      "bullets": [
        "Does this feature test the core assumption?",
        "If removed, can the product still learn what it needs to?",
        "Without this, would users abandon the product?"
      ]
    },
    {
      "heading": "What happens after the MVP",
      "paragraphs": [
        "The most important thing about an MVP is what happens after it. A product that launches and is never evaluated has not delivered on the premise. The MVP needs a feedback mechanism — even an informal one — and the team needs to commit to reviewing what they learned before continuing to build.",
        "Many businesses launch an MVP and then treat it as the product, continuing to add features without reviewing the evidence. The discipline of the MVP approach is not just in scoping the first version — it is in maintaining a learning orientation throughout the product''s development."
      ]
    }
  ]'::jsonb,
  'MVP & Strategy',
  '2024-10-08',
  6,
  true,
  true
),

(
  'brand-positioning-for-south-african-founders',
  'Brand positioning for South African founders: what most people get wrong',
  'Brand positioning is not a logo or a tagline. It is a decision about who you are for — and who you are not. Most South African founders skip this step and pay for it later.',
  '[
    {
      "paragraphs": [
        "Brand positioning is one of the most important strategic decisions a business can make — and one of the most consistently skipped. The pattern is familiar: a business launches, gets some early traction, starts to grow, and eventually realises that different people think the business does different things. The brand is fuzzy. The marketing is inconsistent. The sales conversations are harder than they should be.",
        "This is a positioning problem, not a design problem. And it cannot be solved with a rebrand."
      ]
    },
    {
      "heading": "What positioning actually means",
      "paragraphs": [
        "Positioning is a decision about what your business stands for in the minds of the people you want to reach. It answers three questions: Who is this for? What does it do for them that nothing else does? Why should they believe you?",
        "Good positioning is not about being all things to all people. It is about being the obvious choice for a specific audience with a specific problem. The narrower and more specific the positioning, the more easily the business can be remembered, recommended and chosen."
      ]
    },
    {
      "heading": "The South African context",
      "paragraphs": [
        "South African founders often resist narrow positioning because the market feels small. If you focus too specifically, the thinking goes, you leave revenue on the table. But the opposite is usually true — businesses that try to serve everyone end up being chosen by nobody in particular.",
        "South Africa''s diversity of contexts, languages and economic realities creates real positioning opportunities that are not being exploited. A business that is genuinely built for a specific South African audience — not a slightly localised version of a Western product — has a natural positioning advantage that imported competitors cannot easily replicate."
      ]
    },
    {
      "heading": "How to approach positioning",
      "paragraphs": [
        "Start with the audience. Not a generic demographic description, but a specific articulation of the person you are trying to reach — their context, their problem, what they have already tried and why it has not worked well enough.",
        "Then define the alternative. What would this person do if your business did not exist? That alternative is your real competition, and your positioning needs to explain why your approach is better for this specific person with this specific problem."
      ],
      "bullets": [
        "Define the specific audience, not just a demographic",
        "Identify the problem and what they have already tried",
        "Define the alternative — your real competition",
        "Articulate why your approach is better for this person",
        "Test the positioning in real conversations before committing to it"
      ]
    }
  ]'::jsonb,
  'Brand',
  '2024-11-12',
  8,
  false,
  true
),

(
  'ux-research-before-you-build',
  'Why UX research before you build is cheaper than research after',
  'The most expensive user research is the research you do after your product has launched to a disappointing response. Here is how to front-load the learning.',
  '[
    {
      "paragraphs": [
        "There is a widespread belief that user research is something you do when you have a product — to check whether it works. In practice, the most valuable research happens before the product exists, when the cost of changing direction is lowest.",
        "The logic is straightforward: every assumption that is validated before development begins is one fewer expensive course correction after launch."
      ]
    },
    {
      "heading": "What early-stage research actually involves",
      "paragraphs": [
        "Early-stage UX research does not require a large budget, a research lab or months of work. At its simplest, it involves talking to the people you are designing for — understanding their context, their existing behaviours, their frustrations and their goals.",
        "Five to eight conversations with people who represent the target audience will surface patterns that no amount of assumption-making will reveal. The questions to answer are: What problem are they actually trying to solve? How do they currently solve it? What works and what does not? What would need to be true for a new solution to be worth adopting?"
      ]
    },
    {
      "heading": "What this changes",
      "paragraphs": [
        "Good early research regularly changes the product scope, the information architecture and sometimes the core value proposition. This sounds alarming before it happens. In practice, it almost always leads to a more focused, more useful product.",
        "The alternative is to build based on assumptions, launch, observe disappointing adoption, and then conduct the research that should have happened at the start — but now with the added constraint of an existing product that is hard to change."
      ],
      "bullets": [
        "Validates or challenges the core value proposition before development begins",
        "Reveals the user''s actual mental models for information architecture",
        "Identifies the friction points in current workflows that the product needs to address",
        "Reduces the risk of building features that users do not value"
      ]
    }
  ]'::jsonb,
  'UX Research',
  '2024-12-03',
  5,
  false,
  true
),

(
  'digital-strategy-south-africa',
  'Digital strategy in the South African context: five things to do differently',
  'Importing digital playbooks from the US or UK without adapting them to the South African context is a reliable way to produce work that does not land. Here is what to think about instead.',
  '[
    {
      "paragraphs": [
        "Digital strategy in South Africa operates in a context that is distinct from the markets where most of the widely-shared playbooks were developed. Connectivity, device patterns, consumer behaviour, language and economic context are all different — and strategies that work in mature digital markets often need significant adaptation to be effective here.",
        "This is not an argument for building everything from scratch. It is an argument for thinking carefully about which assumptions to import and which to challenge."
      ]
    },
    {
      "heading": "The five things to do differently",
      "paragraphs": [
        "First, design for mobile as the primary experience. Smartphone access in South Africa significantly outpaces desktop access in most consumer markets. A strategy that treats mobile as a secondary channel is starting from the wrong premise.",
        "Second, account for data cost sensitivity. Many South African consumers are acutely aware of how much data their digital interactions consume. Products and websites that are data-heavy will be abandoned. Performance optimisation is not a technical nice-to-have — it is a strategic requirement.",
        "Third, do not assume uniform English fluency. South Africa has eleven official languages and a significant proportion of the population that is more comfortable in languages other than English. Content strategy that ignores this limits the audience.",
        "Fourth, understand the trust gap. Levels of trust in digital financial transactions, data handling and online purchases remain lower in South Africa than in more established markets. Design that builds trust explicitly — through transparency, plain language and visible security indicators — performs better than design that assumes trust.",
        "Fifth, account for infrastructure variability. Unreliable electricity supply affects device charging and network availability. Products that depend on continuous connectivity need offline resilience. Products that do not account for load-shedding patterns in their communication timing will miss windows of engagement."
      ],
      "bullets": [
        "Design for mobile as the primary — not secondary — experience",
        "Optimise for data-conscious users: performance is a strategic requirement",
        "Build multilingual content capacity into the strategy",
        "Design to build trust, not just assume it",
        "Account for infrastructure variability in product and communication design"
      ]
    }
  ]'::jsonb,
  'SA Digital',
  '2025-01-20',
  7,
  false,
  true
);


-- ---------------------------------------------------------------------------
-- Re-enable triggers
-- ---------------------------------------------------------------------------
set session_replication_role = default;
