import { Link } from 'react-router-dom';
import { currentYear } from '../../utils/format';

const serviceLinks = [
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Product Design', to: '/services/product-design' },
  { label: 'Website Design & Build', to: '/services/website-design-build' },
  { label: 'Brand Identity', to: '/services/brand-identity' },
  { label: 'Digital Strategy', to: '/services/digital-strategy' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
  { label: 'SEO', to: '/services/seo' },
];

const studioLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Process', to: '/process' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black" role="contentinfo">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="KHULA by NKM — home">
              <div className="font-heading text-2xl font-600 text-brand-white mb-0.5">KHULA</div>
              <div className="text-[10px] tracking-widest text-brand-grey uppercase mb-4">by NKM</div>
            </Link>
            <p className="text-sm text-brand-grey leading-relaxed max-w-xs">
              A founder-led digital product and creative studio working at the intersection of
              design, technology and strategy.
            </p>
            <p className="text-xs text-brand-grey/60 mt-4">Design. Build. Grow.</p>
          </div>

          {/* Studio links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-brand-grey mb-4">Studio</h3>
            <ul className="space-y-2.5">
              {studioLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/60 hover:text-brand-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-brand-grey mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/60 hover:text-brand-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-sm text-brand-green hover:text-brand-green/80 transition-colors"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-brand-grey mb-4">Start a Project</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Have an idea worth growing? Let's turn it into something real.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-green text-brand-black text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#34a365] transition-colors"
            >
              Get in touch
            </Link>
            <div className="mt-6">
              <p className="text-xs text-brand-grey mb-2">Based in South Africa</p>
              {import.meta.env.VITE_CONTACT_EMAIL && (
                <a
                  href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                  className="text-xs text-white/50 hover:text-brand-white transition-colors"
                >
                  {import.meta.env.VITE_CONTACT_EMAIL}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-brand-grey/60">
            © {currentYear()} KHULA by NKM. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-brand-grey/60 hover:text-brand-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-brand-grey/60 hover:text-brand-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
