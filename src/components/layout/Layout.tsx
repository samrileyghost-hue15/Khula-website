import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-brand-white">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-green focus:text-brand-black focus:rounded focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-16 md:pt-18" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
