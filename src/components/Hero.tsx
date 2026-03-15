import React from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { SITE_CONFIG } from '../config/content';
import './Hero.scss';

interface HeroProps { onShopClick: () => void; }

const particleConfig: any = {
  fullScreen: false,
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true, area: 800 } },
    color: { value: ['#E8A800', '#FFD700', '#B87800', '#ffffff'] },
    shape: { type: ['circle', 'triangle'] },
    opacity: { value: { min: 0.03, max: 0.25 }, animation: { enable: true, speed: 0.4 } },
    size: { value: { min: 0.5, max: 2 }, animation: { enable: true, speed: 0.8 } },
    links: { enable: true, distance: 150, color: '#E8A800', opacity: 0.07, width: 0.8 },
    move: { enable: true, speed: 0.35, direction: 'none' as any, random: true, outModes: { default: 'bounce' as any } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' } },
    modes: { grab: { distance: 160, links: { opacity: 0.25 } }, push: { quantity: 2 } }
  },
  detectRetina: true,
};

const stagger: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const item: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
};

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const [ready, setReady] = React.useState(false);
  const cfg = SITE_CONFIG.hero;
  const brand = SITE_CONFIG.brand;

  React.useEffect(() => {
    initParticlesEngine(async (e: any) => { await loadSlim(e); }).then(() => setReady(true));
  }, []);

  const statIcons = [<Users size={14} />, <Shield size={14} />, <Zap size={14} />];

  return (
    <section className="ehero">
      {ready && (
        <div className="ehero__particles">
          <Particles id="emperor-particles" options={particleConfig} />
        </div>
      )}

      <div className="ehero__bg-grid" />
      <div className="ehero__bg-glow" />
      <div className="ehero__bg-vignette" />

      <div className="ehero__lines">
        <div className="ehero__line ehero__line--1" />
        <div className="ehero__line ehero__line--2" />
        <div className="ehero__line ehero__line--3" />
      </div>

      <div className="ehero__layout">
        {/* Left — content */}
        <motion.div className="ehero__content" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <div className="badge badge--gold">
              <span>{cfg.badge}</span>
            </div>
          </motion.div>

          <motion.h1 className="ehero__title" variants={item}>
            {cfg.titleLine1}<br />
            <span className="gold-text ehero__title--emperor">{cfg.titleLine2}</span>
          </motion.h1>

          <motion.p className="ehero__sub" variants={item}>
            {cfg.description}
          </motion.p>

          <motion.div className="ehero__ctas" variants={item}>
            <button className="btn btn--gold ehero__cta-main" onClick={onShopClick}>
              <Zap size={16} /> {cfg.ctaPrimary}
            </button>
            <button className="btn btn--outline ehero__cta-sec">
              {cfg.ctaSecondary} <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div className="ehero__stats" variants={item}>
            {cfg.stats.map((s, i) => (
              <div key={s.label} className="ehero__stat">
                <div className="ehero__stat-icon">{statIcons[i]}</div>
                <div>
                  <div className="ehero__stat-val">{s.value}</div>
                  <div className="ehero__stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — statue */}
        <motion.div
          className="ehero__visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="ehero__statue-wrap">
            <div className="ehero__statue-rings">
              <div className="ehero__ring ehero__ring--1" />
              <div className="ehero__ring ehero__ring--2" />
              <div className="ehero__ring ehero__ring--3" />
            </div>
            <img src={brand.statueGif} alt="Emperor" className="ehero__statue" />
            <div className="ehero__statue-glow" />
          </div>

          <motion.div
            className="ehero__float-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={brand.logoGif} alt="avatar" className="ehero__float-avatar" />
            <div>
              <div className="ehero__float-name">{cfg.floatingCardName}</div>
              <div className="ehero__float-status">
                <span className="ehero__float-dot" /> {cfg.floatingCardStatus}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="ehero__scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
      >
        <div className="ehero__scroll-line" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
};

export default Hero;
