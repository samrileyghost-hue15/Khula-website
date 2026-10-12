import { SEOHead } from '../components/ui/SEOHead';
import { currentYear } from '../utils/format';

export function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="KHULA by NKM privacy policy — how we collect, use and protect your personal information."
        canonical="/privacy"
        noIndex
      />

      <section className="section-y">
        <div className="container-content max-w-3xl">
          <h1 className="font-heading text-display-md text-brand-white mb-3">Privacy Policy</h1>
          <p className="text-brand-grey text-sm mb-10">Last reviewed: {currentYear()}</p>

          <div className="prose-khula space-y-8">
            <div className="p-4 bg-white/[0.03] border border-white/10">
              <p className="text-xs text-brand-grey leading-relaxed">
                <strong className="text-white/70">Draft notice:</strong> This privacy policy is a
                draft document. It reflects the current implementation of this website and should be
                reviewed by an appropriate legal professional before this website is published to a
                live audience.
              </p>
            </div>

            <Section title="Who we are">
              <p>
                KHULA by NKM is a founder-led digital product and creative studio based in South
                Africa. This privacy policy explains how we collect, use and protect personal
                information submitted through this website.
              </p>
              <p>
                References to "KHULA", "we", "us" and "our" refer to KHULA by NKM and its founder,
                Nkululeko Malaza.
              </p>
            </Section>

            <Section title="What information we collect">
              <p>We collect information that you voluntarily provide when you:</p>
              <ul>
                <li>Submit a project enquiry through the contact form</li>
                <li>Contact us directly by email</li>
              </ul>
              <p>
                This information may include your name, email address, contact number, business
                name, and the details of your project enquiry.
              </p>
              <p>
                We do not collect payment information, government identification or sensitive
                personal information through this website.
              </p>
            </Section>

            <Section title="How we use your information">
              <p>Information submitted through the contact form is used to:</p>
              <ul>
                <li>Review your project enquiry and determine the most appropriate response</li>
                <li>Contact you to discuss the project scope and approach</li>
                <li>Maintain a record of project correspondence</li>
              </ul>
              <p>
                We do not sell, share or transfer your personal information to third parties for
                marketing purposes.
              </p>
            </Section>

            <Section title="How information is stored">
              <p>
                Enquiry information submitted through this website is currently handled through the
                browser. No persistent backend storage is configured in this development build. When
                a production backend is configured, enquiry data will be stored securely using
                appropriate access controls.
              </p>
              <p>
                We retain enquiry information for as long as it is relevant to a potential or active
                project engagement.
              </p>
            </Section>

            <Section title="Your rights">
              <p>You have the right to:</p>
              <ul>
                <li>Request access to personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>
                To exercise these rights, contact us at the email address provided on this website.
              </p>
            </Section>

            <Section title="Cookies and tracking">
              <p>
                This website does not currently use analytics or tracking cookies. If analytics are
                added in the future, this policy will be updated and appropriate consent mechanisms
                will be implemented.
              </p>
            </Section>

            <Section title="Third-party services">
              <p>
                This website uses Google Fonts for typography. Font files are loaded from Google's
                servers. No other third-party tracking or advertising services are currently in use.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                This policy may be updated from time to time. Material changes will be reflected in
                the review date at the top of this page.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For questions about this privacy policy or how your information is handled, please
                use the contact form on this website.
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
