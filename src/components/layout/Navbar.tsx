import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab') {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-brand-white' : 'text-brand-grey hover:text-brand-white'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-black/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Wordmark */}
            <Link
              to="/"
              className="flex flex-col leading-none group"
              aria-label="KHULA by NKM — home"
            >
              <span className="font-heading text-xl font-700 tracking-tight text-brand-white group-hover:text-brand-white transition-colors">
                KHULA
              </span>
              <span className="text-[10px] tracking-widest text-brand-grey uppercase font-body leading-none">
                by NKM
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={activeLinkClass}>
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/packages"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-brand-green' : 'text-brand-grey hover:text-brand-green'
                  }`
                }
              >
                Packages
              </NavLink>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button as="link" to="/contact" variant="primary" size="sm">
                Start a Project
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              className="md:hidden p-2 text-brand-white hover:text-brand-green transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-black/80 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-brand-black border-l border-white/10 transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-heading text-lg font-600 text-brand-white">KHULA</span>
            <span className="text-[9px] tracking-widest text-brand-grey uppercase">by NKM</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-brand-grey hover:text-brand-white transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-3 text-base font-medium border-b border-white/5 transition-colors ${
                  isActive ? 'text-brand-white' : 'text-brand-grey hover:text-brand-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/packages"
            className={({ isActive }) =>
              `py-3 text-base font-medium border-b border-white/5 transition-colors ${
                isActive ? 'text-brand-green' : 'text-brand-grey hover:text-brand-green'
              }`
            }
          >
            Packages
          </NavLink>
        </nav>

        <div className="px-6 py-6 border-t border-white/10">
          <Button as="link" to="/contact" variant="primary" size="md" fullWidth>
            Start a Project
          </Button>
        </div>
      </div>
    </>
  );
}
