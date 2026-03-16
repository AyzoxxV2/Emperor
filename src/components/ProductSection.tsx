/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, Crown, ExternalLink, ShoppingBag } from 'lucide-react';
import { Product, DISCORD_URL } from '../data/products';
import { SITE_CONFIG } from '../config/content';
import './ProductSection.scss';

interface ProductSectionProps {
  products: Product[];
}

const PricingCard: React.FC<{ product: Product; index: number; isActive: boolean }> = ({ product, index, isActive }) => {
  const handleBuy = () => {
    window.open(product.discordUrl || DISCORD_URL, '_blank');
  };

  return (
    <motion.div
      className={`ecard ${product.popular ? 'ecard--popular' : ''} ${isActive ? 'ecard--active' : ''}`}
      style={{ '--accent': product.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ y: -6 }}
    >
      {product.popular && <div className="ecard__popular-glow" />}

      <div className="ecard__header">
        <div className="ecard__icon-wrap">
          <span className="ecard__icon">{product.icon}</span>
        </div>
        <div className="ecard__meta">
          {product.badge && (
            <div className={`badge badge--${product.badgeType || 'gold'} ecard__badge`}>
              {product.popular && <Crown size={9} />}
              <span>{product.badge}</span>
            </div>
          )}
          <div className="label-mono ecard__category">{product.category}</div>
        </div>
      </div>

      <h3 className="ecard__name">{product.name}</h3>
      <p className="ecard__tagline">{product.tagline}</p>

      <div className="ecard__price-wrap">
        <span className="ecard__price">${product.price.toFixed(2)}</span>
        <span className="ecard__period">/mo</span>
        {product.originalPrice && (
          <span className="ecard__original">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>

      <div className="ecard__divider" />

      <ul className="ecard__features">
        {product.features.map(f => (
          <li key={f} className="ecard__feature">
            <Check size={13} className="ecard__check" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Discord buy button */}
      <motion.button
        className={`ecard__cta ecard__cta--discord ${product.popular ? 'ecard__cta--popular' : ''}`}
        onClick={handleBuy}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.905 19.905 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
        </svg>
        {SITE_CONFIG.productCard.buyOnDiscordLabel}
        <ExternalLink size={12} />
      </motion.button>

      <p className="ecard__discord-note">{SITE_CONFIG.productCard.discordNote}</p>
    </motion.div>
  );
};

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', '-64%']);
  const x = useSpring(rawX, { stiffness: 55, damping: 18 });

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      setActiveIdx(Math.min(products.length - 1, Math.round(v * (products.length - 0.5))));
    });
  }, [scrollYProgress, products.length]);

  return (
    <section className="eproducts" ref={sectionRef}>
      <div className="eproducts__sticky">
        <div className="eproducts__header">
          <div className="section-label">
            <div className="gold-line" />
            <span>Our Plans</span>
          </div>
          <h2 className="display-lg">
            Choose your <span className="gold-text">Plan</span>
          </h2>
          <p className="eproducts__sub">
            {SITE_CONFIG.productCard.plansSubtitle}
          </p>
          <div className="eproducts__dots">
            {products.map((_, i) => (
              <div key={i} className={`eproducts__dot ${i === activeIdx ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="eproducts__viewport">
          <motion.div className="eproducts__track" style={{ x }}>
            {products.map((p, i) => (
              <PricingCard key={p.id} product={p} index={i} isActive={i === activeIdx} />
            ))}
          </motion.div>
        </div>

        <div className="eproducts__progress">
          <motion.div className="eproducts__progress-fill" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
