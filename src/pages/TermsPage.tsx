import { SEOHead } from '../components/ui/SEOHead';
import { currentYear } from '../utils/format';

export function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="KHULA by NKM terms of service — the basis on which KHULA engages with clients."
        canonical="/terms"
        noIndex
      />

      <section className="section-y">
        <div className="container-content max-w-3xl">
          <h1 className="font-heading text-display-md text-brand-white mb-3">Terms of Service</h1>
          <p className="text-brand-grey text-sm mb-10">Last reviewed: {currentYear()}</p>

          <div className="prose-khula space-y-8">
            <div className="p-4 bg-white/[0.03] border border-white/10">
              <p className="text-xs text-brand-grey leading-relaxed">
                <strong className="text-white/70">Draft notice:</strong> These terms are a draft
                document and should be reviewed by an appropriate legal professional before this
                website is published to a live audience. They do not constitute legal advice.
              </p>
            </div>

            <Section title="Introduction">
              <p>
                These terms of service describe the basis on which KHULA by NKM ("KHULA", "we",
                "us") engages with clients and website visitors. By submitting a project enquiry or
                entering into a project engagement with KHULA, you agree to these terms.
              </p>
            </Section>

            <Section title="Project engagements">
              <p>
                All project engagements are governed by a written project proposal or agreement that
                defines the scope, deliverables, timeline, payment terms and any other relevant
                conditions. These terms apply generally, but the project proposal takes precedence in
                the event of a conflict.
              </p>
              <p>
                No work begins until a project proposal has been agreed in writing. An enquiry
                submitted through this website is not a binding agreement.
              </p>
            </Section>

            <Section title="Scope and changes">
              <p>
                The scope of each engagement is defined in the project proposal. Changes to scope
                are discussed openly, documented and may affect the timeline and price. KHULA will
                not begin out-of-scope work without written agreement.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                Upon receipt of full payment, KHULA transfers ownership of the agreed final
                deliverables to the client. KHULA retains the right to display the work in its
                portfolio unless otherwise agreed.
              </p>
              <p>
                Third-party assets, fonts, stock imagery and software are subject to their own
                licences. The client is responsible for obtaining and maintaining appropriate
                licences for third-party elements used in the deliverables.
              </p>
            </Section>

            <Section title="Payment">
              <p>
                Payment terms are defined in the project proposal. KHULA typically requires a
                deposit before work begins and milestone payments tied to agreed deliverables.
              </p>
              <p>
                Prices displayed on this website are starting estimates. Final pricing is agreed in
                the project proposal. Displayed prices do not include VAT unless stated. VAT
                treatment is confirmed during project scoping.
              </p>
            </Section>

            <Section title="Liability">
              <p>
                KHULA takes professional care in its work. However, KHULA's liability is limited to
                the fees paid for the relevant engagement. KHULA is not responsible for indirect,
                consequential or incidental losses arising from the use of the deliverables.
              </p>
            </Section>

            <Section title="Advertising spend">
              <p>
                Advertising spend on platforms such as Meta, Google or LinkedIn is always paid
                directly by the client and is separate from KHULA's management or service fees.
                KHULA does not take commission on advertising spend.
              </p>
            </Section>

            <Section title="Website content">
              <p>
                The content on this website is provided for informational purposes. KHULA makes
                reasonable efforts to keep the information accurate, but does not guarantee that it
                is complete, current or free from errors.
              </p>
              <p>
                Project descriptions on this website accurately represent the nature and maturity of
                the work. Concepts, prototypes and deployed products are identified as such.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For questions about these terms or a specific engagement, please use the contact
                form on this website.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/10 pb-8">
      <h2 className="font-heading text-lg font-600 text-brand-white mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
