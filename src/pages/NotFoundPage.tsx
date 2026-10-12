import { Link } from 'react-router-dom';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page Not Found" noIndex />
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <div
            className="font-heading text-[8rem] font-700 text-white/[0.04] leading-none mb-6 select-none"
            aria-hidden="true"
          >
            404
          </div>
          <h1 className="font-heading text-display-sm text-brand-white mb-3">Page not found</h1>
          <p className="text-white/50 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved. Try navigating to one of
            the links below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/" variant="primary" size="md">
              Back to Home
            </Button>
            <Button as="link" to="/work" variant="ghost" size="md">
              View Our Work
            </Button>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-brand-grey">
              <Link to="/services" className="hover:text-brand-white transition-colors">
                Services
              </Link>
              <Link to="/packages" className="hover:text-brand-white transition-colors">
                Packages
              </Link>
              <Link to="/about" className="hover:text-brand-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-brand-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
