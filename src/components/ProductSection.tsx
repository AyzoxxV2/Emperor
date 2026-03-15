/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, Crown, ExternalLink, Zap } from 'lucide-react';
import { Product, DISCORD_URL } from '../data/products';
import './ProductSection.scss';

interface ProductSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const PricingCard: React.FC<{ product: Product; onAdd: (p: Product) => void; index: number; isActive: boolean }> = ({ product, onAdd, index, isActive }) => {
  const [adding, setAdding] = useState(false);

  const handleClick = () => {
    if (product.isFree) {
      window.open(product.discordUrl || DISCORD_URL, '_blank');
      return;
    }
    setAdding(true);
    onAdd(product);
    setTimeout(() => setAdding(false), 900);
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
      {product.isFree && <div className="ecard__free-banner">🎮 Community Access</div>}

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
        {product.isFree ? (
          <span className="ecard__price ecard__price--free">FREE</span>
        ) : (
          <>
            <span className="ecard__price">${product.price.toFixed(2)}</span>
            <span className="ecard__period">/mo</span>
          </>
        )}
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

      <motion.button
        className={`ecard__cta ${adding ? 'ecard__cta--adding' : ''} ${product.isFree ? 'ecard__cta--discord' : product.popular ? 'btn btn--gold' : 'btn btn--outline'}`}
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
      >
        <AnimatePresence mode="wait">
          {adding ? (
            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              ✓ Added!
            </motion.span>
          ) : (
            <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {product.isFree
                ? <><ExternalLink size={14} /> Join Discord — Free</>
                : <><ShoppingBag size={14} /> Choose Plan</>
              }
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {product.isFree && (
        <p className="ecard__discord-note">Opens discord.gg/TjXbYS9DZu</p>
      )}
    </motion.div>
  );
};

const ProductSection: React.FC<ProductSectionProps> = ({ products, onAddToCart }) => {
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
            Community access via Discord — premium plans for serious players.
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
              <PricingCard
                key={p.id} product={p} onAdd={onAddToCart}
                index={i} isActive={i === activeIdx}
              />
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
