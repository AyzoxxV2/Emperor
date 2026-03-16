/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import './Pages.scss';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => (
  <div className="notfound">
    {/* Background */}
    <div className="notfound__grid" />
    <div className="notfound__glow" />

    <motion.div className="notfound__content"
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* 404 big number */}
      <div className="notfound__number">
        <span className="notfound__four">4</span>
        <div className="notfound__logo-wrap">
          <img src="/emperor/emperor_statue.gif" alt="Emperor" className="notfound__statue" />
        </div>
        <span className="notfound__four">4</span>
      </div>

      <div className="badge badge--gold notfound__badge">PAGE NOT FOUND</div>

      <h1 className="notfound__title">
        Lost in the <span className="gold-text">Empire?</span>
      </h1>

      <p className="notfound__sub">
        This page doesn't exist or has been moved.<br />
        The Emperor's realm awaits you back home.
      </p>

      <div className="notfound__ctas">
        <Link to="/" className="btn btn--gold notfound__cta">
          <Home size={16} /> Back to Home
        </Link>
        <Link to="/products" className="btn btn--outline notfound__cta">
          Browse Plans <ArrowRight size={14} />
        </Link>
      </div>

      {/* Scan line animation */}
      <div className="notfound__scan-wrap">
        <div className="notfound__scan-line" />
        <span className="notfound__scan-text">ERROR_404 // REDIRECTING...</span>
      </div>
    </motion.div>
  </div>
);

export default NotFoundPage;
