import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { GlassProvider } from 'glass-design-system';
import { BackgroundProvider, useBackground } from './context/BackgroundContext';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Home from './pages/Home';
import Foundations from './pages/Foundations';
import Examples from './pages/Examples';
import GlassShowcase from './pages/GlassShowcase';
import Philosophy from './pages/Philosophy';
import TypeShowcase from './pages/TypeShowcase';
import ColorShowcase from './pages/ColorShowcase';
import ProductDemo from './pages/ProductDemo';
import ComponentDocs from './pages/ComponentDocs';
import LayoutShowcase from './pages/LayoutShowcase';
import OrbShowcase from './pages/OrbShowcase';

// Reset scroll position on every route change, unless it targets an anchor
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
};

// Inner component so it can consume the BackgroundContext
const AppInner: React.FC = () => {
  const { activeGradient, activePattern, glass } = useBackground();

  // Apply active gradient to body background; restore on unmount
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevAttachment = document.body.style.backgroundAttachment;
    const prevTransition = document.body.style.transition;
    document.body.style.transition = 'background 700ms ease';
    document.body.style.background = activeGradient;
    document.body.style.backgroundAttachment = 'fixed';
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundAttachment = prevAttachment;
      document.body.style.transition = prevTransition;
    };
  }, [activeGradient]);

  return (
    <GlassProvider {...glass}>
      <div className="site">
        {/* Pattern texture overlay — sits above gradient, below all content */}
        {activePattern.url && (
          <div
            aria-hidden="true"
            className="site-pattern"
            style={{ backgroundImage: `url("${activePattern.url}")`, backgroundSize: activePattern.size }}
          />
        )}

        <SiteHeader />
        <ScrollToTop />

        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foundations" element={<Foundations />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/surfaces" element={<GlassShowcase />} />
            <Route path="/components" element={<ComponentDocs />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/type" element={<TypeShowcase />} />
            <Route path="/colors" element={<ColorShowcase />} />
            <Route path="/product" element={<ProductDemo />} />
            <Route path="/layouts" element={<LayoutShowcase />} />
            <Route path="/orbs" element={<OrbShowcase />} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </GlassProvider>
  );
};

const App: React.FC = () => (
  <BackgroundProvider>
    <AppInner />
  </BackgroundProvider>
);

export default App;
