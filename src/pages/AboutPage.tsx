import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About"
        description="KHULA is a founder-led digital product and creative studio founded by Nkululeko Malaza. Design, technology and strategy working together."
        canonical="/about"
      />

      {/* Header */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-4xl">
          <SectionLabel className="mb-4 block">About KHULA</SectionLabel>
          <h1 className="font-heading text-display-lg text-brand-white mb-6">
            Built by a designer who thinks like a founder.
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            KHULA is a founder-led digital product and creative studio working at the intersection
            of design, technology and strategy.
          </p>
        </div>
      </section>

      {/* Why KHULA exists */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionLabel className="mb-4 block">Why KHULA exists</SectionLabel>
              <h2 className="font-heading text-display-sm text-brand-white mb-6">
                Most ideas never become real things.
              </h2>
              <div className="prose-khula space-y-4">
                <p>
                  KHULA was founded because the gap between a good idea and a working digital product
                  is almost always a design and execution problem — not an idea problem. There are
                  countless businesses, founders and organisations with real insights and genuine
                  opportunities that never get built properly, or get built without the thinking that
                  would make them work.
                </p>
                <p>
                  The studio exists to close that gap. To do the design work, the strategic thinking
                  and the practical execution that turns ideas into things that grow.
                </p>
                <p>
                  KHULA means "grow" in isiZulu — and that word captures what the studio is actually
                  about. Not design for its own sake. Not technology for its own sake. Design and
                  technology that help businesses and the people they serve grow.
                </p>
              </div>
            </div>
            <div>
              <SectionLabel className="mb-4 block">What KHULA believes</SectionLabel>
              <div className="space-y-5">
                {[
                  {
                    title: 'Design is strategic',
                    body: 'Good design is not decoration. It is a way of thinking about problems, testing assumptions and building things that work for real people.',
                  },
                  {
                    title: 'Execution matters',
                    body: 'Strategy without execution is just a document. KHULA does the work — design, builds, launches — and stays close to the commercial outcomes.',
                  },
                  {
                    title: 'Context is everything',
                    body: 'Importing frameworks and playbooks without understanding the specific business, audience and market context is how you build the wrong thing right.',
                  },
                  {
                    title: 'Honesty over polish',
                    body: 'KHULA presents work and progress honestly. A concept is a concept. A prototype is a prototype. The difference matters.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="border-b border-white/10 pb-5">
                    <h3 className="font-heading text-sm font-600 text-brand-white mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-y border-b border-white/10">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <div>
              <div className="relative max-w-sm">
                {/* Green accent */}
                <div
                  className="absolute -inset-2 bg-gradient-to-br from-brand-green/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative border border-brand-green/25 overflow-hidden">
                  <img
                    src="/images/nkululeko-malaza.jpg"
                    alt="Nkululeko Malaza — Founder & Product Designer, KHULA by NKM"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4' }}
                    loading="lazy"
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 to-transparent px-5 py-5">
                    <div className="font-heading text-base font-600 text-brand-white">
                      Nkululeko Malaza
                    </div>
                    <div className="text-xs tracking-widest text-brand-green uppercase mt-0.5">
                      Founder &amp; Product Designer
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/20">
                      <span className="text-xs text-white/50">Allan Gray Orbis Foundation</span>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-white/50">WR SETA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <SectionLabel className="mb-4 block">Founder &amp; Product Designer</SectionLabel>
              <h2 className="font-heading text-display-sm text-brand-white mb-6">
                Nkululeko Malaza
              </h2>
              <div className="prose-khula space-y-4">
                <p>
                  Nkululeko Malaza is a product designer who approaches every engagement with both
                  creative rigour and commercial awareness. KHULA was founded on the belief that
                  design — when connected to strategy and executed with technical confidence — is one
                  of the most powerful tools a business has.
                </p>
                <p>
                  The studio's work spans product design, UX research, brand identity, website design
                  and digital marketing. These disciplines are treated as connected, not siloed —
                  because the most effective digital products are ones where every layer of the
                  experience has been thought through.
                </p>
                <p>
                  KHULA works with businesses, founders and organisations across South Africa — and
                  is particularly interested in projects where design can create real-world access,
                  clarity and growth.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 space-y-3">
                <SectionLabel className="mb-3 block">Recognition</SectionLabel>
                {[
                  {
                    title: 'Allan Gray Orbis Foundation Recipient',
                    description:
                      'A programme supporting South African entrepreneurs with exceptional potential.',
                  },
                  {
                    title: 'WR SETA Recipient',
                    description: 'Skills development recognition in the wholesale and retail sector.',
                  },
                ].map(({ title, description }) => (
                  <div key={title} className="flex items-start gap-3 p-4 bg-white/[0.03] border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 mt-1.5" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium text-brand-white mb-0.5">{title}</div>
                      <div className="text-xs text-brand-grey">{description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the studio works */}
      <section className="section-y border-b border-white/10">
        <div className="container-content max-w-3xl">
          <SectionLabel className="mb-4 block">How KHULA works</SectionLabel>
          <h2 className="font-heading text-display-sm text-brand-white mb-8">
            Close to the problem. Close to the outcome.
          </h2>
          <div className="space-y-8">
            {[
              {
                heading: 'Discovery before design',
                body: 'Every project starts with understanding the business, its audience and the problem worth solving. Design decisions are grounded in that understanding, not made in isolation.',
              },
              {
                heading: 'Design and strategy together',
                body: 'KHULA does not separate creative and strategic thinking. The brief informs the design, the design informs the strategy and the strategy shapes what gets built.',
              },
              {
                heading: 'Honest about constraints',
                body: 'Scope is defined clearly before work starts. KHULA is direct about what is and is not possible within a given engagement — and about the difference between a concept, a prototype and a deployed product.',
              },
              {
                heading: 'Built for the South African context',
                body: 'KHULA designs for people in their actual context — considering connectivity, device access, language and economic reality rather than importing assumptions from other markets.',
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="border-b border-white/10 pb-8">
                <h3 className="font-heading text-base font-600 text-brand-white mb-2">{heading}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-content text-center max-w-lg mx-auto">
          <h2 className="font-heading text-display-sm text-brand-white mb-4">
            Ready to build something together?
          </h2>
          <p className="text-white/50 mb-8">
            Tell KHULA about your project and we will work out the right approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="primary" size="md">
              Start a Project
            </Button>
            <Button as="link" to="/work" variant="ghost" size="md">
              View Our Work
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
