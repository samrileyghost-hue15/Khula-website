import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// ── Lazy-loaded pages (enables code splitting + Suspense) ─────────────────────
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const CaseStudyPage = lazy(() => import('./pages/work/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then((m) => ({ default: m.PackagesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })));
const ArticlePage = lazy(() => import('./pages/insights/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// ── Page-level loading shell ──────────────────────────────────────────────────
function PageShell() {
  return (
    <div className="section-y container-content" aria-label="Loading page" aria-busy="true">
      <div className="animate-pulse space-y-6 max-w-2xl">
        <div className="h-3 bg-white/[0.05] rounded w-24" />
        <div className="h-10 bg-white/[0.07] rounded w-2/3" />
        <div className="space-y-2">
          <div className="h-4 bg-white/[0.04] rounded w-full" />
          <div className="h-4 bg-white/[0.04] rounded w-5/6" />
          <div className="h-4 bg-white/[0.04] rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            {/* Static / lightweight pages — no boundary needed */}
            <Route path="/privacy" element={
              <Suspense fallback={<PageShell />}><PrivacyPage /></Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<PageShell />}><TermsPage /></Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<PageShell />}><NotFoundPage /></Suspense>
            } />

            {/* Dynamic pages — each gets its own ErrorBoundary */}
            <Route path="/" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><HomePage /></Suspense></ErrorBoundary>
            } />
            <Route path="/services" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><ServicesPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/services/:slug" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><ServiceDetailPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/work" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><WorkPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/work/:slug" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><CaseStudyPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/packages" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><PackagesPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/about" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><AboutPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/process" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><ProcessPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/insights" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><InsightsPage /></Suspense></ErrorBoundary>
            } />
            <Route path="/insights/:slug" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><ArticlePage /></Suspense></ErrorBoundary>
            } />
            <Route path="/contact" element={
              <ErrorBoundary><Suspense fallback={<PageShell />}><ContactPage /></Suspense></ErrorBoundary>
            } />

          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
