/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import './Pages.scss';
import './NotFoundPage.scss';
import { SITE_CONFIG } from '../config/content';

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
          <img src={SITE_CONFIG.brand.statueGif} alt="Emperor" className="notfound__statue" />
        </div>
        <span className="notfound__four">4</span>
      </div>

      <div className="badge badge--gold notfound__badge">PAGE NOT FOUND</div>

      <h1 className="notfound__title">
        {SITE_CONFIG.notFoundPage.title} <span className="gold-text">{SITE_CONFIG.notFoundPage.titleGold}</span>
      </h1>

      <p className="notfound__sub">{SITE_CONFIG.notFoundPage.subtitle.split('\n').map((l: string, i: number) => <span key={i}>{l}<br /></span>)}</p>

      <div className="notfound__ctas">
        <Link to="/" className="btn btn--gold notfound__cta">
          <Home size={16} /> {SITE_CONFIG.notFoundPage.ctaPrimary}
        </Link>
        <Link to="/products" className="btn btn--outline notfound__cta">
          {SITE_CONFIG.notFoundPage.ctaSecondary} <ArrowRight size={14} />
        </Link>
      </div>

      {/* Scan line animation */}
      <div className="notfound__scan-wrap">
        <div className="notfound__scan-line" />
        <span className="notfound__scan-text">{SITE_CONFIG.notFoundPage.scanText}</span>
      </div>
    </motion.div>
  </div>
);

export default NotFoundPage;
