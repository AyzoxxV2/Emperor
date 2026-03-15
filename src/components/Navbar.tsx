import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Zap, LogOut, Crown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/content';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.scss';

interface NavbarProps {
  onCartOpen: () => void;
  onAuthOpen: (mode: 'login' | 'register') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartOpen, onAuthOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = SITE_CONFIG.navbar.links;

  const isActive = (to: string) => location.pathname === to;

  return (
    <motion.nav
      className={`enav ${scrolled ? 'enav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.76,0,0.24,1] }}
    >
      <div className="enav__inner">
        <Link to="/" className="enav__logo">
          <img src="/emperor/emperor_bot_avatar_ani.gif" alt="Emperor" className="enav__logo-gif" />
          <span className="enav__brand">EMPEROR</span>
        </Link>

        <ul className="enav__links">
          {links.map((l, i) => (
            <motion.li key={l.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
              <Link to={l.to} className={`enav__link ${isActive(l.to) ? 'enav__link--active' : ''}`}>{l.label}</Link>
            </motion.li>
          ))}
        </ul>

        <div className="enav__actions">
          {isAuthenticated && user ? (
            <div className="enav__user-wrap">
              <button className="enav__user-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <img src={user.avatar} alt={user.name} className="enav__user-avatar" />
                <span className="enav__user-name">{user.name}</span>
                <div className="enav__user-plan">{user.plan.toUpperCase()}</div>
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div className="enav__user-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="enav__user-menu-header">
                      <div className="enav__user-menu-name">{user.name}</div>
                      <div className="enav__user-menu-email">{user.email}</div>
                    </div>
                    <Link to="/dashboard" className="enav__user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <Crown size={14} /> Dashboard
                    </Link>
                    <Link to="/support" className="enav__user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <Zap size={14} /> Support
                    </Link>
                    <button className="enav__user-menu-item enav__user-menu-item--danger" onClick={() => { logout(); setUserMenuOpen(false); }}>
                      <LogOut size={14} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button className="btn btn--ghost enav__signin" onClick={() => onAuthOpen('login')}>Sign in</button>
              <button className="btn btn--gold enav__cta" onClick={() => onAuthOpen('register')}>
                <Zap size={14} /> Get Started
              </button>
            </>
          )}
          <button className="enav__cart" onClick={onCartOpen}>
            <ShoppingBag size={15} />
            {count > 0 && (
              <motion.span className="enav__cart-badge" key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
                {count}
              </motion.span>
            )}
          </button>
          <button className="btn btn--icon enav__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      <div className="enav__gold-line" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="enav__mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {links.map(l => (
              <Link key={l.label} to={l.to} className="enav__mobile-link">{l.label}</Link>
            ))}
            <div className="enav__mobile-ctas">
              {isAuthenticated ? (
                <button className="btn btn--outline" onClick={logout}>Sign out</button>
              ) : (
                <>
                  <button className="btn btn--outline" onClick={() => onAuthOpen('login')}>Sign in</button>
                  <button className="btn btn--gold" onClick={() => onAuthOpen('register')}>Get Started</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
