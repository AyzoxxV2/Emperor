import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import './styles/globals.scss';

import { AuthProvider } from './context/AuthContext';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SupportPage from './pages/SupportPage';
import DashboardPage from './pages/DashboardPage';
import VouchersPage from './pages/VouchersPage';

// ── Custom Cursor ──────────────────────────────
const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ hover: false, click: false });

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf: number;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const down = () => setState(s => ({ ...s, click: true }));
    const up = () => setState(s => ({ ...s, click: false }));
    const over = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('button,a,[data-hover]')) setState(s => ({ ...s, hover: true }));
    };
    const out = () => setState(s => ({ ...s, hover: false }));
    const loop = () => {
      if (dotRef.current) { dotRef.current.style.left = `${mx}px`; dotRef.current.style.top = `${my}px`; }
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`cursor ${state.hover ? 'cursor--hover' : ''} ${state.click ? 'cursor--click' : ''}`}>
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </div>
  );
};

// ── Page transition ────────────────────────────
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ── Inner app (needs router context) ──────────
const InnerApp: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => { setAuthMode(mode); setAuthOpen(true); };

  return (
    <>
      <Navbar onAuthOpen={openAuth} />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vouchers" element={<VouchersPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageWrapper>

      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={m => setAuthMode(m)}
      />
    </>
  );
};

// ── Root ───────────────────────────────────────
const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <AuthProvider>
      <Cursor />
          <div className="noise-overlay" />
          <Toaster position="bottom-right" />

          <AnimatePresence>
            {!loaded && <Loader onComplete={() => setLoaded(true)} />}
          </AnimatePresence>

          <AnimatePresence>
            {loaded && (
              <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <BrowserRouter>
                  <InnerApp />
                </BrowserRouter>
              </motion.div>
            )}
          </AnimatePresence>

    </AuthProvider>
  );
};

export default App;
