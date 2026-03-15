import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../config/content';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Cloud, Headphones, ChevronDown, ArrowRight, Users, ExternalLink, Twitter, Github } from 'lucide-react';
import './BottomSections.scss';

const featureIcons = [<Zap size={22} />, <Shield size={22} />, <Cloud size={22} />, <Headphones size={22} />];
const features = SITE_CONFIG.features.items.map((f, i) => ({ ...f, icon: featureIcons[i] }));

const testimonials = SITE_CONFIG.testimonials.items;

const faqItems = [
  { q: 'Is Emperor compatible with all games?', a: 'Yes! Emperor Launcher supports 500+ games including Valorant, CS2, Fortnite, Apex Legends, and more. The list is updated weekly.' },
  { q: 'Can I try it for free?', a: 'Absolutely. Our FREE plan is permanent with no expiry and no credit card required. It includes the base launcher, FPS optimization, and community support.' },
  { q: 'How does Booster PRO work?', a: 'It automatically optimizes Windows processes, frees RAM, and adjusts network settings to reduce latency. On average, users gain +40% FPS instantly.' },
  { q: 'Can I cancel my subscription?', a: 'Yes, at any time from your member dashboard. You keep access until the end of your paid period. No questions asked.' },
  { q: 'Does Lifetime Access include future updates?', a: 'Yes! Lifetime Access includes absolutely every future update, new tool, and feature — forever.' },
];

const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onToggle: () => void }> = ({ q, a, isOpen, onToggle }) => (
  <div className={`efaq-item ${isOpen ? 'efaq-item--open' : ''}`}>
    <button className="efaq-item__q" onClick={onToggle}>
      <span>{q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={16} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div className="efaq-item__a"
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
        >
          <p>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const BottomSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [featRef, featInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testiRef, testiInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* ── Features ── */}
      <section className="efeatures" ref={featRef}>
        <div className="efeatures__container">
          <motion.div className="efeatures__header"
            initial={{ opacity: 0, y: 30 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="section-label"><div className="gold-line" /><span>Why Emperor</span></div>
            <h2 className="display-lg">Everything you need<br /><span className="gold-text">to dominate</span></h2>
          </motion.div>
          <div className="efeatures__grid">
            {features.map((f, i) => (
              <motion.div key={f.title} className="efeat-card"
                initial={{ opacity: 0, y: 24 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="efeat-card__icon">{f.icon}</div>
                <h3 className="efeat-card__title">{f.title}</h3>
                <p className="efeat-card__desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials" ref={testiRef}>
        <div className="testimonials__container">
          <motion.div className="testimonials__header"
            initial={{ opacity: 0, y: 30 }} animate={testiInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="section-label"><div className="gold-line" /><span>Reviews</span></div>
            <h2 className="display-lg">Trusted by<br /><span className="gold-text">50,000+ gamers</span></h2>
          </motion.div>
          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="testi-card"
                initial={{ opacity: 0, y: 30 }} animate={testiInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="testi-card__stars">
                  {Array.from({ length: t.stars }).map((_, s) => <span key={s} style={{ color: 'var(--gold)' }}>★</span>)}
                </div>
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <span className="testi-card__avatar">{t.avatar}</span>
                  <div>
                    <div className="testi-card__name">{t.name}</div>
                    <div className="testi-card__product">{t.product}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="efaq-section" ref={faqRef}>
        <div className="efaq-section__container">
          <div className="efaq-section__layout">
            <motion.div className="efaq-section__left"
              initial={{ opacity: 0, x: -30 }} animate={faqInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            >
              <div className="section-label"><div className="gold-line" /><span>FAQ</span></div>
              <h2 className="display-lg">Got<br /><span className="gold-text">questions?</span></h2>
              <p className="efaq-section__sub">
                Can't find your answer here?<br />
                Join our Discord — we reply in under 2 hours.
              </p>
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="btn btn--gold efaq-section__discord">
                <Users size={15} /> Join Discord
              </a>
              <img src="/emperor/Banners.png" alt="FAQ" className="efaq-section__banner" />
            </motion.div>
            <motion.div className="efaq-section__right"
              initial={{ opacity: 0, x: 30 }} animate={faqInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            >
              {faqItems.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a}
                  isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="ecta-banner">
        <div className="ecta-banner__inner">
          <div className="ecta-banner__glow" />
          <motion.div className="ecta-banner__content"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="badge badge--gold">Join 50,000+ gamers</div>
            <h2 className="display-lg">
              Ready to join<br /><span className="gold-text">the Empire?</span>
            </h2>
            <p>Start free. Upgrade when you're ready.</p>
            <div className="ecta-banner__ctas">
              <a href="/pricing" className="btn btn--gold ecta-banner__btn">
                Get Started <ArrowRight size={16} />
              </a>
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="btn btn--outline ecta-banner__btn">
                <Users size={15} /> Join Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="efooter">
        <div className="efooter__top">
          <div className="efooter__brand-col">
            <div className="efooter__brand">
              <img src="/emperor/emperor_bot_avatar_ani.gif" alt="Emperor" className="efooter__avatar" />
              <div>
                <div className="efooter__name">EMPEROR</div>
                <div className="efooter__sub">Gaming Platform — Est. 2025</div>
              </div>
            </div>
            <p className="efooter__desc">
              The all-in-one gaming platform. Launcher, optimizer, cloud saves and streaming tools — built for players who want to win.
            </p>
            <div className="efooter__socials">
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="efooter__social efooter__social--discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.905 19.905 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Discord
              </a>
              <a href="#" className="efooter__social">
                <Twitter size={16} /> Twitter
              </a>
              <a href="#" className="efooter__social">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          <div className="efooter__links-cols">
            <div className="efooter__links-col">
              <div className="efooter__links-title">Product</div>
              <a href="/products" className="efooter__link">Products</a>
              <a href="/features" className="efooter__link">Features</a>
              <a href="/pricing" className="efooter__link">Pricing</a>
              <a href="#" className="efooter__link">Changelog</a>
              <a href="#" className="efooter__link">Roadmap</a>
            </div>
            <div className="efooter__links-col">
              <div className="efooter__links-title">Support</div>
              <a href="/support" className="efooter__link">Help Center</a>
              <a href="https://discord.gg/TjXbYS9DZu" target="_blank" rel="noopener noreferrer" className="efooter__link">
                Discord <ExternalLink size={10} />
              </a>
              <a href="mailto:support@emperor.gg" className="efooter__link">Email Us</a>
              <a href="#" className="efooter__link">Status</a>
              <a href="#" className="efooter__link">Report a Bug</a>
            </div>
            <div className="efooter__links-col">
              <div className="efooter__links-title">Legal</div>
              <a href="#" className="efooter__link">Terms of Service</a>
              <a href="#" className="efooter__link">Privacy Policy</a>
              <a href="#" className="efooter__link">Cookie Policy</a>
              <a href="#" className="efooter__link">Refund Policy</a>
            </div>
          </div>
        </div>

        <div className="efooter__bottom">
          <div className="efooter__copy">© 2025 Emperor Gaming Platform. All rights reserved.</div>
          <div className="efooter__badges">
            <span className="efooter__badge">🔒 SSL Secured</span>
            <span className="efooter__badge">⚡ 99.9% Uptime</span>
            <span className="efooter__badge">🌍 Global CDN</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BottomSections;
