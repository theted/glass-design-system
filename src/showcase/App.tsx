import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { GlassBackdrop, glassVars } from 'glass-design-system';
import { Header } from './site/Header';
import { Footer } from './site/Footer';
import { ThemeProvider, useTheme } from './site/theme';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import Foundations from './pages/Foundations';
import ComponentsIndex from './pages/ComponentsIndex';
import ComponentPage from './pages/ComponentPage';
import Examples from './pages/Examples';
import Backdrops from './pages/Backdrops';
import NotFound from './pages/NotFound';

/** New page: start at the top, or at the anchor the link names. */
const ScrollRestore = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return window.scrollTo(0, 0);
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [pathname, hash]);
  return null;
};

const Site = () => {
  const { theme } = useTheme();
  const { palette, texture, motion, ...knobs } = theme;

  // The site's knobs go on :root, so everything follows them: toasts in
  // document.body, the page background, the scrollbars.
  useEffect(() => {
    const root = document.documentElement.style;
    for (const [name, value] of Object.entries(glassVars(knobs))) root.setProperty(name, value);
  });

  return (
    <>
      <GlassBackdrop fixed palette={palette} texture={texture} motion={motion} />
      <ScrollRestore />
      <div className="site">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<GetStarted />} />
            <Route path="/foundations" element={<Foundations />} />
            <Route path="/components" element={<ComponentsIndex />} />
            <Route path="/components/:slug" element={<ComponentPage />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/backdrops" element={<Backdrops />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <Site />
  </ThemeProvider>
);

export default App;
