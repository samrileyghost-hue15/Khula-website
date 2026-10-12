import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';

const stages = [
  {
    number: '01',
    title: 'Discovery and Alignment',
    duration: 'Week 1–2',
    description:
      'Every project starts here. KHULA takes time to understand the business, its audience, its objectives and the problem the project is trying to solve. Without this, design decisions are just guesses.',
    activities: [
      'Project briefing and objectives review',
      'Stakeholder interviews or alignment sessions',
      'Competitive and context review',
      'Scope and constraint definition',
      'Success criteria and measurement approach',
    ],
    output: 'Aligned project brief and defined scope.',
  },
  {
    number: '02',
    title: 'Research and Definition',
    duration: 'Week 2–4',
    description:
      'Depending on the project type and scope, this stage involves user research, technical discovery or brand strategy work. The goal is to ground the design decisions in real evidence before any screens are made.',
    activities: [
      'User interviews or research (scope-dependent)',
      'Information architecture',
      'User flow mapping',
      'Brand strategy and positioning (for brand work)',
      'Technical requirements definition',
    ],
    output: 'Defined strategy, user flows and design foundations.',
  },
  {
    number: '03',
    title: 'Design and Development',
    duration: 'Week 3–8+',
    description:
      'The core execution stage. Design is developed iteratively — wireframes, prototypes, high-fidelity screens, brand assets or builds depending on the engagement type. Work is shared regularly, not revealed at the end.',
    activities: [
      'Wireframes and low-fidelity prototypes',
      'High-fidelity UI or brand design',
      'Design system development',
      'Front-end build (for website and product builds)',
      'Iterative review and refinement',
    ],
    output: 'Reviewed and refined design deliverables or working build.',
  },
  {
    number: '04',
    title: 'Review and Refinement',
    duration: 'Ongoing, structured',
    description:
      'Review is a structured part of the process, not a single approval gate at the end. Feedback is collected, prioritised and incorporated in defined rounds as agreed in the project proposal.',
    activities: [
      'Structured feedback sessions',
      'Revision against agreed criteria',
      'Stakeholder sign-off at defined milestones',
      'Quality review against brief and scope',
    ],
    output: 'Approved deliverables ready for handover or launch.',
  },
  {
    number: '05',
    title: 'Delivery and Handover',
    duration: 'Final week',
    description:
      'Handover is clean and documented. Files, specs, guidelines and supporting documentation are delivered in formats agreed at the start of the project.',
    activities: [
      'Final asset delivery in agreed formats',
      'Design system and brand guideline documentation',
      'Developer handoff documentation (for digital products)',
      'Deployment support (for website builds)',
      'Handover walkthrough and Q&A',
    ],
    output: 'Fully documented deliverables handed over to the client.',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    duration: 'Optional',
    description:
      'Some projects benefit from continued design or strategic support after the initial engagement. This is available through the KHULA Retainer or a scoped follow-up engagement.',
    activities: [
      'Design iterations and updates',
      'New feature or section design',
      'Ongoing marketing or content production',
      'Strategic review and recommendations',
    ],
    output: 'Continued collaboration through a defined ongoing engagement.',
  },
];

export function ProcessPage() {
  return (
    <>
      <SEOHead
        title="Process"
        description="KHULA's project process — from discovery and research through design, review and handover. Six stages that adapt to the project's size and complexity."
        canonical="/process"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-4xl">
          <SectionLabel className="mb-4 block">How projects work</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-6">Process</h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            A clear, adaptable process that keeps projects aligned, honest and moving forward — from
            the first conversation to the final handover.
          </p>
          <p className="text-sm text-brand-grey mt-4">
            The process adapts to the size and complexity of each engagement. A focused MVP design
            project moves through these stages faster than a comprehensive brand and product build.
          </p>
        </div>
      </section>

      {/* Process stages */}
      <section className="section-y">
        <div className="container-content">
          <div className="space-y-0">
            {stages.map((stage, i) => (
              <div
                key={stage.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 ${
                  i < stages.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                {/* Number + title */}
                <div className="lg:col-span-3">
                  <div
                    className="font-heading text-5xl font-300 text-white/10 mb-2"
                    aria-hidden="true"
                  >
                    {stage.number}
                  </div>
                  <h2 className="font-heading text-xl font-600 text-brand-white mb-1">
                    {stage.title}
                  </h2>
                  <div className="text-xs text-brand-green">{stage.duration}</div>
                </div>

                {/* Description + activities */}
                <div className="lg:col-span-5">
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {stage.description}
                  </p>
                  <ul className="space-y-2">
                    {stage.activities.map((a, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-brand-grey flex-shrink-0 mt-2" aria-hidden="true" />
                        <span className="text-xs text-white/50">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Output */}
                <div className="lg:col-span-4">
                  <div className="bg-white/[0.03] border border-white/10 p-5">
                    <div className="text-xs tracking-widest uppercase text-brand-grey mb-2">
                      Output
                    </div>
                    <p className="text-sm text-white/70">{stage.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical notes */}
      <section className="section-y border-t border-white/10">
        <div className="container-content">
          <div className="max-w-2xl mx-auto">
            <SectionLabel className="mb-6 block text-center">Practical information</SectionLabel>
            <div className="space-y-6">
              {[
                {
                  title: 'Scope is agreed in writing before work begins',
                  body: 'Deliverables, milestones, timelines and pricing are confirmed in a project proposal before any work starts. Changes to scope are discussed openly and documented.',
                },
                {
                  title: 'Feedback is structured, not open-ended',
                  body: 'Review rounds are defined in the proposal. Feedback is collected in a structured way to keep projects moving and avoid open-ended iteration.',
                },
                {
                  title: 'Communication is clear and regular',
                  body: 'KHULA provides regular project updates and is responsive to questions. The working relationship is collaborative, not arms-length.',
                },
                {
                  title: 'Third-party costs are always separate',
                  body: 'Hosting, domain registration, stock photography, advertising spend, platform subscriptions and other third-party costs are always the client\'s responsibility and are not included in project fees.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-5 border-b border-white/10 pb-6">
                  <span className="text-brand-green flex-shrink-0 mt-0.5 text-sm">—</span>
                  <div>
                    <h3 className="font-heading text-sm font-600 text-brand-white mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="container-content text-center">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">
            Ready to start a project?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            The first step is a conversation about your project, its objectives and what a useful
            engagement would look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="primary" size="md">
              Start a Project
              <ArrowRight size={15} />
            </Button>
            <Button as="link" to="/packages" variant="ghost" size="md">
              View Packages
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
