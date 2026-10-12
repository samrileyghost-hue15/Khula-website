import type { Service } from '../types';

export const services: Service[] = [
  // ── Product & UX ──────────────────────────────────────────────────────────
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    category: 'Product & UX',
    billingType: 'once-off',
    startingPrice: 6500,
    shortDescription: 'Interfaces designed for people — clear, intuitive and built to convert.',
    description:
      'Good interface design is invisible. It guides users towards outcomes without friction, confusion or cognitive overload. KHULA approaches UI/UX design as a combination of visual craft, interaction logic and user empathy — producing interfaces that work as well as they look.',
    problemsSolved: [
      'Users drop off because the interface is confusing or inconsistent',
      'The product looks dated and undermines trust',
      'There is no coherent design language across screens',
      'Development is blocked waiting for design decisions',
    ],
    suitableFor: [
      'Startups building their first digital product',
      'Businesses redesigning an existing web or mobile application',
      'Teams that need a design system to hand off to developers',
      'Founders who want to validate an idea before committing to full development',
    ],
    deliverables: [
      'User flow diagrams',
      'Wireframes and low-fidelity prototypes',
      'High-fidelity UI screens',
      'Component library or design system',
      'Clickable prototype for stakeholder review',
      'Developer handoff documentation',
    ],
    process: [
      'Understand the product, users and business objectives',
      'Map user flows and identify friction points',
      'Sketch and wireframe key screens',
      'Design high-fidelity interfaces aligned to the brand',
      'Prototype for review and iteration',
      'Prepare handoff assets for development',
    ],
    faqs: [
      {
        question: 'Do you design for mobile and desktop?',
        answer:
          'Yes. Designs are produced for the breakpoints relevant to your product. Responsive behaviour is considered and documented as part of the handoff.',
      },
      {
        question: 'Can you design within an existing brand?',
        answer:
          'Yes. If a brand guide or existing style is in place, designs will align to it. If the brand needs development, that can be scoped separately.',
      },
      {
        question: 'What tools do you use?',
        answer:
          'Figma is the primary design tool. Prototypes and design systems are also delivered in Figma.',
      },
    ],
    relatedProjectSlugs: ['regen-rail', 'mzansi-pay'],
  },
  {
    slug: 'product-design',
    name: 'Product Design',
    category: 'Product & UX',
    billingType: 'once-off',
    startingPrice: 12000,
    shortDescription: 'End-to-end product thinking — from problem definition to designed solution.',
    description:
      'Product design is more than screens. It is the discipline of understanding a problem deeply, defining the right solution and designing an experience that achieves measurable outcomes. KHULA brings a founder-level perspective to product design — balancing user needs, business goals and technical realities.',
    problemsSolved: [
      'The team has a feature idea but no clear product direction',
      'The product exists but users are not engaging with key functionality',
      'There is no coherent experience across the product\'s flows',
      'Design and development are misaligned, causing rework and delay',
    ],
    suitableFor: [
      'Early-stage startups designing their core product',
      'Scaleups redesigning a product that has grown without design direction',
      'Organisations digitising manual processes',
      'Founders who need a design partner, not just a designer',
    ],
    deliverables: [
      'Product strategy document',
      'User research synthesis',
      'Information architecture',
      'End-to-end user flows',
      'Wireframes and high-fidelity screens',
      'Interactive prototype',
      'Design system foundations',
      'Developer handoff with component specifications',
    ],
    process: [
      'Product discovery — understand the business, users and competitive context',
      'Define the product scope, success criteria and design principles',
      'Map information architecture and user journeys',
      'Design and prototype key flows',
      'Review and refine through structured feedback',
      'Deliver handoff-ready assets with documentation',
    ],
    faqs: [
      {
        question: 'Is product design the same as UI/UX design?',
        answer:
          'Product design is broader. It includes strategy, information architecture, user research and system thinking — in addition to interface design. It is appropriate when you need end-to-end design thinking, not just screen-level polish.',
      },
      {
        question: 'Do you work with development teams?',
        answer:
          'Yes. KHULA can work alongside your engineering team, provide design specifications and participate in handoff and review processes.',
      },
    ],
    relatedProjectSlugs: ['regen-rail', 'lelwapa-sa'],
  },
  {
    slug: 'ux-research-strategy',
    name: 'UX Research & Strategy',
    category: 'Product & UX',
    billingType: 'once-off',
    startingPrice: 5000,
    shortDescription: 'Understand your users before you build. Research that shapes better decisions.',
    description:
      'Building the wrong thing is expensive. UX research reduces that risk by grounding product decisions in real user behaviour, needs and context. KHULA conducts research appropriate to the project\'s stage — from exploratory discovery to evaluative usability testing.',
    problemsSolved: [
      'The team is building based on assumptions rather than evidence',
      'Users are not adopting the product as expected',
      'Stakeholders cannot agree on what to build next',
      'The existing product has usability problems that need diagnosing',
    ],
    suitableFor: [
      'Teams before a major product investment',
      'Businesses redesigning an existing product',
      'Organisations that have never formally researched their users',
      'Founders validating a concept before development',
    ],
    deliverables: [
      'Research plan and discussion guides',
      'User interview synthesis',
      'Usability testing report',
      'Insight and opportunity summary',
      'Persona or user archetype documentation',
      'Strategic recommendations',
    ],
    process: [
      'Define research objectives and questions',
      'Plan appropriate research methods',
      'Conduct interviews, observation or usability sessions',
      'Synthesise findings into actionable insights',
      'Present recommendations and design implications',
    ],
    faqs: [
      {
        question: 'Do you recruit research participants?',
        answer:
          'Participant recruitment can be included in scope, depending on the target audience and availability. For some contexts, research is conducted with clients\' existing user bases.',
      },
      {
        question: 'Can research be combined with a design project?',
        answer:
          'Yes. Research is typically most valuable when it directly informs design. Combined engagements can be scoped accordingly.',
      },
    ],
    relatedProjectSlugs: ['regen-rail'],
  },
  {
    slug: 'mvp-design-prototyping',
    name: 'MVP Design & Prototyping',
    category: 'Product & UX',
    billingType: 'once-off',
    startingPrice: 15000,
    shortDescription: 'Test your core idea with a designed, clickable prototype — before writing code.',
    description:
      'An MVP is not just a minimal product — it is a deliberate test of your most important assumptions. KHULA designs MVPs that focus attention on the highest-value user journeys, validate product thinking with real users and give development teams a clear, designed spec to build from.',
    problemsSolved: [
      'Stakeholders cannot align on what the product should do first',
      'Investment or development is needed but there is no visual spec',
      'The team wants to test the concept with users before building',
      'The first version of the product needs to work well, not just exist',
    ],
    suitableFor: [
      'Founders preparing for a seed or pre-seed raise',
      'Teams about to commission a development build',
      'Organisations piloting a new digital service',
      'Businesses replacing a manual process with a digital product',
    ],
    deliverables: [
      'Product scope definition',
      'Core user flow mapping',
      'Wireframe set',
      'High-fidelity MVP screen designs',
      'Interactive Figma prototype',
      'User testing summary (scope-dependent)',
      'Developer handoff documentation',
    ],
    process: [
      'Define the MVP scope — what is being tested and why',
      'Map the minimum required user journeys',
      'Design and prototype the core experience',
      'Test with representative users where possible',
      'Refine and prepare for handoff or further development',
    ],
    faqs: [
      {
        question: 'Is development included?',
        answer:
          'MVP Design & Prototyping covers the design, information architecture and clickable prototype. Development can be scoped separately or handed off to a development team.',
      },
      {
        question: 'How many screens are typically included?',
        answer:
          'This depends on the product\'s complexity. The focus is on the journeys required to test the core value proposition, not completeness.',
      },
    ],
    relatedProjectSlugs: ['mzansi-pay', 'lelwapa-sa'],
  },

  // ── Web & Digital ─────────────────────────────────────────────────────────
  {
    slug: 'website-design-build',
    name: 'Website Design & Build',
    category: 'Web & Digital',
    billingType: 'once-off',
    startingPrice: 12000,
    shortDescription: 'Designed and built websites that do real business work — not just brochures.',
    description:
      'A website is often the first and most lasting impression a business makes. KHULA designs and builds websites that communicate clearly, convert visitors into enquiries or customers and reflect the quality of the business they represent.',
    problemsSolved: [
      'The existing website no longer reflects the business or its offering',
      'The website is not generating enquiries or leads',
      'The site does not work well on mobile',
      'The business has outgrown a template-based solution',
    ],
    suitableFor: [
      'Businesses launching or relaunching their digital presence',
      'Startups that need a professional website to accompany a product launch',
      'Professional service firms that need a credible, content-led website',
      'Creative studios, agencies and consultancies',
    ],
    deliverables: [
      'UX and content strategy',
      'Page designs for all key sections',
      'Responsive, accessible front-end build',
      'CMS integration (scope-dependent)',
      'Basic SEO foundations',
      'Performance optimisation',
      'Deployment support',
    ],
    process: [
      'Define the website\'s goals, audience and content requirements',
      'Design key page layouts and the visual system',
      'Build the responsive front-end',
      'Integrate CMS if required',
      'Test across devices and browsers',
      'Deploy and hand over',
    ],
    faqs: [
      {
        question: 'Does this include hosting?',
        answer:
          'Hosting is not included in the design and build fee. Recommendations are provided for suitable hosting options. Third-party costs are always separate.',
      },
      {
        question: 'Can I update the website myself after it is built?',
        answer:
          'Yes, if a CMS is included in scope. The approach depends on the type of website and how frequently content is expected to change.',
      },
    ],
    relatedProjectSlugs: ['aurora-creative-studio'],
  },

  // ── Brand & Creative ──────────────────────────────────────────────────────
  {
    slug: 'brand-identity',
    name: 'Brand Identity',
    category: 'Brand & Creative',
    billingType: 'once-off',
    startingPrice: 8500,
    shortDescription: 'A brand identity that communicates who you are before you say a word.',
    description:
      'Brand identity is the visual and verbal system that makes a business recognisable, memorable and credible. KHULA approaches brand identity as a strategic exercise — starting from business positioning and audience understanding before designing the visual expression.',
    problemsSolved: [
      'The business has no consistent visual identity',
      'The existing brand no longer reflects the business\'s direction',
      'Different materials look like they came from different organisations',
      'The brand does not communicate credibility or differentiation',
    ],
    suitableFor: [
      'New businesses establishing their identity',
      'Established businesses repositioning or rebranding',
      'Founders who want a brand that reflects their ambition',
      'Creative studios, service firms and product companies',
    ],
    deliverables: [
      'Brand strategy and positioning brief',
      'Logomark and logotype',
      'Colour palette and typography system',
      'Brand guidelines document',
      'Application examples',
      'Digital and print asset files',
    ],
    process: [
      'Brand discovery — understand the business, positioning and audience',
      'Develop the brand strategy and creative direction',
      'Design and present identity concepts',
      'Refine the selected direction',
      'Produce guidelines and final asset files',
    ],
    faqs: [
      {
        question: 'How many logo concepts will I receive?',
        answer:
          'The number of concepts presented is defined in the project proposal. The focus is on quality and strategic fit rather than quantity.',
      },
      {
        question: 'What file formats are delivered?',
        answer:
          'Final assets are delivered in vector formats (SVG, PDF) and rasterised files (PNG) at appropriate sizes for digital and print use.',
      },
    ],
    relatedProjectSlugs: ['aurora-creative-studio'],
  },
  {
    slug: 'creative-direction',
    name: 'Creative Direction',
    category: 'Brand & Creative',
    billingType: 'once-off',
    startingPrice: 7500,
    shortDescription: 'Creative leadership that ensures your visual output is coherent and considered.',
    description:
      'Creative direction shapes how a brand or product looks and feels across every touchpoint. KHULA provides creative direction for campaigns, digital products, brand refreshes and content productions — ensuring that the visual output reflects the strategy and speaks to the right audience.',
    problemsSolved: [
      'Creative output is inconsistent across channels',
      'The team lacks a strategic creative perspective',
      'A campaign or launch needs a strong, unified visual concept',
      'The brand needs to evolve but risks losing coherence',
    ],
    suitableFor: [
      'Brands planning a campaign or launch',
      'Teams that need senior creative oversight without a full-time hire',
      'Businesses developing marketing or content at scale',
    ],
    deliverables: [
      'Creative brief and concept development',
      'Visual direction and mood board',
      'Art direction for photography, video or illustration',
      'Review and feedback on production outputs',
      'Creative standards documentation',
    ],
    process: [
      'Creative brief — understand objectives, audience and context',
      'Develop concepts and present visual direction',
      'Guide production through review and feedback',
      'Ensure consistency across deliverables',
    ],
    faqs: [
      {
        question: 'Do you manage production teams?',
        answer:
          'Creative direction can include working with photographers, illustrators and content teams. The scope of coordination is agreed in advance.',
      },
    ],
    relatedProjectSlugs: ['aurora-creative-studio'],
  },

  // ── Strategy & Growth ─────────────────────────────────────────────────────
  {
    slug: 'digital-strategy',
    name: 'Digital Strategy',
    category: 'Strategy & Growth',
    billingType: 'once-off',
    startingPrice: 5000,
    shortDescription: 'A clear digital direction that connects your business goals to actionable plans.',
    description:
      'Many businesses invest in digital without a coherent strategy. KHULA develops digital strategies that are grounded in business objectives, audience insight and realistic execution — giving teams a clear direction rather than a list of tactics.',
    problemsSolved: [
      'The business is spending on digital without a clear plan',
      'Different channels are operating in silos without a shared objective',
      'Leadership cannot agree on digital priorities',
      'The business needs to enter a new digital channel or market',
    ],
    suitableFor: [
      'Businesses planning their first meaningful digital investment',
      'Organisations reviewing their digital presence and performance',
      'Founders who want to align product, brand and marketing before executing',
    ],
    deliverables: [
      'Digital audit and opportunity assessment',
      'Strategic recommendations',
      'Channel and capability priorities',
      'Measurement framework',
      'Execution roadmap',
    ],
    process: [
      'Audit the current digital presence and performance',
      'Identify the business objectives and audience context',
      'Define strategic priorities and channel approach',
      'Develop the roadmap and success metrics',
      'Present and align with stakeholders',
    ],
    faqs: [
      {
        question: 'Does this include implementation?',
        answer:
          'Digital Strategy is a standalone advisory service. Implementation of recommendations can be scoped separately through relevant service or package engagements.',
      },
    ],
  },

  // ── Marketing & Performance ───────────────────────────────────────────────
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 6000,
    shortDescription: 'Integrated digital marketing that builds visibility and drives measurable results.',
    description:
      'Digital marketing at KHULA is not a set of disconnected tactics. It is a coordinated effort across relevant channels, guided by strategy and measured against business outcomes. The approach is defined by the scope agreed for each engagement.',
    problemsSolved: [
      'The business is not visible to its target audience online',
      'Marketing spend is not producing measurable results',
      'The team is executing without a clear plan or consistent message',
    ],
    suitableFor: [
      'Businesses building or growing their online presence',
      'Startups that need marketing support from an early stage',
      'Established businesses entering new digital channels',
    ],
    deliverables: [
      'Marketing plan aligned to business objectives',
      'Channel-specific execution',
      'Performance reporting',
      'Creative asset production (scope-dependent)',
    ],
    process: [
      'Define objectives, audience and channel strategy',
      'Agree scope, deliverables and measurement approach',
      'Execute across agreed channels',
      'Report performance and refine approach monthly',
    ],
    faqs: [
      {
        question: 'Is advertising spend included?',
        answer:
          'No. Advertising spend is always separate from management fees. The budget allocated to paid media is agreed and managed transparently.',
      },
    ],
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 5500,
    shortDescription: 'Consistent, considered social media presence — managed on your behalf.',
    description:
      'Social media management at KHULA covers content planning, creation, publishing and community engagement across the platforms agreed in scope. The approach is adapted to each client\'s brand, audience and business objectives.',
    problemsSolved: [
      'The business has inconsistent or absent social media presence',
      'The team does not have capacity to manage social media well',
      'Content is generic and not generating engagement',
      'There is no coherent content strategy across platforms',
    ],
    suitableFor: [
      'Businesses that need social media managed consistently',
      'Brands building an audience in the South African market',
      'Founders who want to focus on the business, not the content calendar',
    ],
    deliverables: [
      'Monthly content calendar',
      'Content creation and scheduling',
      'Community management',
      'Monthly performance summary',
    ],
    process: [
      'Understand the brand voice, audience and objectives',
      'Develop a content strategy and monthly calendar',
      'Produce and schedule content',
      'Monitor engagement and report monthly',
    ],
    faqs: [
      {
        question: 'Which platforms are included?',
        answer:
          'Platforms are agreed as part of the scope. Typical options include Instagram, LinkedIn, Facebook and X. The appropriate mix depends on the audience and objectives.',
      },
      {
        question: 'How many posts per month?',
        answer:
          'The publishing frequency is defined in the scope. It depends on the platform mix, content type and budget.',
      },
    ],
  },
  {
    slug: 'social-content',
    name: 'Social + Content',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 8500,
    shortDescription: 'Social media management combined with original content production.',
    description:
      'Social + Content combines community management with original content creation — articles, short-form video, graphics and copy — produced to a strategy and published consistently across agreed channels.',
    problemsSolved: [
      'The business needs both content creation and channel management',
      'Social output lacks quality or strategic alignment',
      'The team has no capacity for regular original content',
    ],
    suitableFor: [
      'Businesses investing seriously in content-led growth',
      'Brands that need professional content production at scale',
      'Organisations building thought leadership or community',
    ],
    deliverables: [
      'Content strategy and monthly calendar',
      'Original content production (graphics, copy, short-form video)',
      'Channel management and scheduling',
      'Engagement and performance reporting',
    ],
    process: [
      'Define content pillars, audience and tone',
      'Develop content calendar and production plan',
      'Produce and publish content across channels',
      'Review performance and adapt quarterly',
    ],
    faqs: [
      {
        question: 'What content formats are included?',
        answer:
          'The content mix is agreed in scope. Typical formats include static graphics, carousels, copy-led posts and short-form video depending on the platform.',
      },
    ],
  },
  {
    slug: 'meta-ads-management',
    name: 'Meta Ads Management',
    category: 'Marketing & Performance',
    billingType: 'once-off',
    startingPrice: 4500,
    shortDescription: 'Meta advertising campaigns managed to reach your audience and drive results.',
    description:
      'Meta Ads Management covers campaign strategy, creative briefing, audience setup, campaign management and performance optimisation across Facebook and Instagram. Advertising spend is separate from the management fee.',
    problemsSolved: [
      'Meta campaigns are running but not producing measurable results',
      'The business needs to reach a specific audience on Meta platforms',
      'Campaign creative and targeting need professional management',
    ],
    suitableFor: [
      'Businesses running or planning Meta advertising campaigns',
      'E-commerce brands targeting South African consumers',
      'Businesses promoting a product launch, event or offer',
    ],
    deliverables: [
      'Campaign strategy and audience brief',
      'Ad creative direction and copy',
      'Campaign setup and management',
      'Performance reporting',
    ],
    process: [
      'Define campaign objectives and target audience',
      'Develop campaign strategy and creative brief',
      'Set up and launch campaigns',
      'Optimise based on performance data',
      'Report results against agreed objectives',
    ],
    faqs: [
      {
        question: 'Is advertising spend included?',
        answer:
          'No. Advertising spend is paid directly to Meta and is always separate from the management fee.',
      },
    ],
  },
  {
    slug: 'google-ads-management',
    name: 'Google Ads Management',
    category: 'Marketing & Performance',
    billingType: 'once-off',
    startingPrice: 5000,
    shortDescription: 'Google Ads campaigns that reach high-intent audiences at the moment of search.',
    description:
      'Google Ads Management covers keyword strategy, campaign setup, ad copy, bid management and performance optimisation across Search and Display. Advertising spend is separate from the management fee.',
    problemsSolved: [
      'The business needs to appear at the top of search results for relevant queries',
      'Existing campaigns are generating clicks but not conversions',
      'Google Ads is running without a coherent keyword or bid strategy',
    ],
    suitableFor: [
      'Businesses with products or services that are actively searched for',
      'Organisations running time-sensitive campaigns',
      'Businesses entering a competitive market where organic reach takes time',
    ],
    deliverables: [
      'Keyword and campaign strategy',
      'Ad copy and extensions',
      'Campaign setup and management',
      'Performance reporting',
    ],
    process: [
      'Keyword research and competitive analysis',
      'Campaign and ad group structure',
      'Write ad copy and configure extensions',
      'Launch and optimise campaigns',
      'Regular performance reporting',
    ],
    faqs: [
      {
        question: 'Is advertising spend included?',
        answer:
          'No. Advertising spend is paid directly to Google and is always separate from the management fee.',
      },
    ],
  },
  {
    slug: 'seo',
    name: 'SEO',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 5500,
    shortDescription: 'Sustainable organic visibility built on technical foundations and quality content.',
    description:
      'SEO at KHULA is a disciplined, long-term investment in organic search visibility. It covers technical SEO foundations, on-page optimisation and content strategy — building discoverability that compounds over time.',
    problemsSolved: [
      'The website is not appearing in relevant search results',
      'Organic traffic is flat or declining',
      'The website has technical issues affecting search performance',
      'Content is not aligned to how the target audience actually searches',
    ],
    suitableFor: [
      'Businesses committed to organic search as a growth channel',
      'Companies with content-driven websites that are not reaching their audience',
      'Businesses preparing for a website launch or redesign',
    ],
    deliverables: [
      'Technical SEO audit',
      'Keyword research and content strategy',
      'On-page optimisation',
      'Content brief development',
      'Monthly performance reporting',
    ],
    process: [
      'Audit technical foundations and current performance',
      'Develop keyword and content strategy',
      'Implement on-page optimisation',
      'Produce or brief content aligned to search intent',
      'Track rankings, traffic and conversions monthly',
    ],
    faqs: [
      {
        question: 'How long before results are visible?',
        answer:
          'SEO results are typically visible within three to six months, depending on the site\'s current state, competition and the consistency of the work. SEO is a long-term investment, not a quick fix.',
      },
    ],
  },
  {
    slug: 'campaign-design',
    name: 'Campaign Design',
    category: 'Marketing & Performance',
    billingType: 'once-off',
    startingPrice: 6500,
    shortDescription: 'Creative campaign design that makes your marketing visually distinct and memorable.',
    description:
      'Campaign Design covers the creative development of marketing campaigns — concept, visual identity, copy direction and production of assets across digital and print channels.',
    problemsSolved: [
      'Marketing campaigns lack a strong creative concept or visual system',
      'Assets across channels are inconsistent',
      'The campaign creative does not reflect the brand',
    ],
    suitableFor: [
      'Businesses launching a product, service or offer',
      'Brands running seasonal or promotional campaigns',
      'Marketing teams that need external creative support',
    ],
    deliverables: [
      'Campaign concept and creative brief',
      'Visual identity for the campaign',
      'Digital and print asset production',
      'Copy direction',
    ],
    process: [
      'Understand campaign objectives and audience',
      'Develop creative concept and visual direction',
      'Produce campaign assets',
      'Deliver production-ready files',
    ],
    faqs: [
      {
        question: 'How many asset formats are included?',
        answer: 'Asset formats and quantities are agreed in the project scope before commencement.',
      },
    ],
  },
  {
    slug: 'marketing-presence',
    name: 'Marketing Presence',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 6000,
    shortDescription: 'Establish and maintain a consistent, professional marketing presence across key channels.',
    description:
      'Marketing Presence is an entry-level monthly engagement covering the essential channels and activities required to maintain a credible, active marketing presence. It is appropriate for businesses that need consistent output without a large marketing budget.',
    problemsSolved: [
      'The business has no active marketing presence',
      'Marketing is reactive rather than planned',
      'The team lacks capacity to maintain consistent output',
    ],
    suitableFor: [
      'Small businesses building their first active marketing presence',
      'Businesses that need a maintained presence while keeping costs controlled',
      'Startups in early stages that need to be visible and credible',
    ],
    deliverables: [
      'Monthly content calendar',
      'Social media posting and management',
      'Basic email marketing (scope-dependent)',
      'Monthly performance summary',
    ],
    process: [
      'Agree channels, content mix and objectives',
      'Develop monthly content calendar',
      'Execute and publish across channels',
      'Report monthly',
    ],
    faqs: [
      {
        question: 'What is the difference between Presence, Growth and Performance?',
        answer:
          'Presence is for businesses establishing consistent visibility. Growth adds more active audience development. Performance focuses on conversion and ROI across paid and owned channels.',
      },
    ],
  },
  {
    slug: 'marketing-growth',
    name: 'Marketing Growth',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 12000,
    shortDescription: 'A more active monthly marketing engagement focused on audience and lead growth.',
    description:
      'Marketing Growth is a mid-tier monthly engagement that combines content, social media, email and light paid activity to build an audience, generate leads and grow the business\'s digital reach.',
    problemsSolved: [
      'The business needs more than a maintained presence — it needs to grow',
      'The marketing funnel is not generating enough leads',
      'Multiple channels need coordination under a single strategy',
    ],
    suitableFor: [
      'Businesses ready to invest in meaningful marketing growth',
      'Companies with an established presence looking to scale',
      'Organisations that need marketing as a growth driver, not just a support function',
    ],
    deliverables: [
      'Growth strategy and monthly plan',
      'Multi-channel content and campaign execution',
      'Email marketing',
      'Light paid media management (ad spend separate)',
      'Lead generation tracking',
      'Monthly performance reporting',
    ],
    process: [
      'Define growth objectives and channel mix',
      'Develop monthly plan aligned to objectives',
      'Execute across owned and paid channels',
      'Optimise based on performance data',
      'Report monthly',
    ],
    faqs: [
      {
        question: 'Is advertising spend included?',
        answer: 'No. Any advertising spend is separate from the monthly management fee.',
      },
    ],
  },
  {
    slug: 'marketing-performance',
    name: 'Marketing Performance',
    category: 'Marketing & Performance',
    billingType: 'monthly',
    startingPrice: 18000,
    shortDescription: 'Full-funnel marketing focused on measurable conversion and return on investment.',
    description:
      'Marketing Performance is a comprehensive monthly engagement covering strategy, content, paid media, SEO and analytics — with a focus on measurable business outcomes. It is appropriate for businesses committed to marketing as a core growth function.',
    problemsSolved: [
      'Marketing spend is not producing measurable returns',
      'The business needs integrated marketing across multiple channels',
      'Conversion rate and lead quality need improvement',
    ],
    suitableFor: [
      'Businesses with meaningful marketing budgets seeking measurable ROI',
      'Companies competing in active digital markets',
      'Organisations that need senior marketing capability without a full-time head of marketing',
    ],
    deliverables: [
      'Full marketing strategy',
      'Content and campaign production',
      'Paid media management (ad spend separate)',
      'SEO implementation',
      'Analytics and conversion tracking',
      'Monthly performance report with recommendations',
    ],
    process: [
      'Audit current marketing performance and channels',
      'Develop full-funnel strategy',
      'Execute across all agreed channels',
      'Optimise campaigns continuously',
      'Report against KPIs monthly',
    ],
    faqs: [
      {
        question: 'Is advertising spend included?',
        answer: 'No. All advertising spend is separate from the management fee.',
      },
    ],
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  if (!category || category === 'All') return services;
  return services.filter((s) => s.category === category);
}

export const SERVICE_CATEGORIES = [
  'All',
  'Product & UX',
  'Web & Digital',
  'Brand & Creative',
  'Strategy & Growth',
  'Marketing & Performance',
] as const;
