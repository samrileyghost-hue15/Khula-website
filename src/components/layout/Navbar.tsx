import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

// Four core destinations + one pricing link — consistent treatment, no split styling
const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/packages', label: 'Pricing' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap in mobile drawer
  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
      if (e.key === 'Tab') {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-white' : 'text-brand-grey hover:text-brand-white'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-brand-black/95 backdrop-blur-sm border-b border-white/5'
            : 'bg-transparent'
          }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link to="/" className="flex flex-col leading-none" aria-label="KHULA by NKM — home">
              <span className="font-heading text-xl font-600 tracking-tight text-brand-white">
                KHULA
              </span>
              <span className="text-[9px] tracking-widest text-brand-grey uppercase font-body leading-none">
                by NKM
              </span>
            </Link>

            {/* Desktop nav — 4 links, consistent grey treatment */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={linkClass}>
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Single desktop CTA */}
            <div className="hidden md:block">
              <Button as="link" to="/contact" variant="primary" size="sm">
                Start a Project
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              className="md:hidden p-2 text-brand-white"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-black/80 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-brand-black border-l border-white/10
          flex flex-col transform transition-transform duration-300 ease-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-heading text-lg text-brand-white">KHULA</span>
            <span className="text-[9px] tracking-widest text-brand-grey uppercase">by NKM</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-brand-grey hover:text-brand-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 py-6 flex flex-col" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-3.5 text-base font-medium border-b border-white/5 transition-colors ${isActive ? 'text-brand-white' : 'text-brand-grey hover:text-brand-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {/* Secondary links — smaller, below separator */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-1">
            {[
              { to: '/process', label: 'Process' },
              { to: '/insights', label: 'Insights' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `py-2 text-sm transition-colors ${isActive ? 'text-white/70' : 'text-brand-grey hover:text-white/70'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-white/10">
          <Button as="link" to="/contact" variant="primary" size="md" fullWidth>
            Start a Project
          </Button>
        </div>
      </div>
    </>
  );
}
