/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, ExternalLink } from 'lucide-react';
import { products, Product } from '../data/products';
import { SITE_CONFIG } from '../config/content';
import './Pages.scss';

// Only show first 4 products (no VAL INTERNAL)
const displayProducts = products.filter(p => p.id !== 5);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleBuy = () => window.open(product.discordUrl || SITE_CONFIG.links.discord, '_blank');

  return (
    <motion.div
      className={`prod-page-card ${product.popular ? 'prod-page-card--popular' : ''}`}
      style={{ '--accent': product.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      {product.popular && <div className="prod-page-card__popular-ribbon"><Crown size={10} /> POPULAR</div>}
      {product.badge && (
        <div className={`badge badge--${product.badgeType || 'gold'} prod-page-card__badge`}>{product.badge}</div>
      )}

      <div className="prod-page-card__icon-wrap">
        <span className="prod-page-card__icon">{product.icon}</span>
        <div className="prod-page-card__icon-glow" />
      </div>

      <div className="prod-page-card__category label-mono">{product.category}</div>
      <h3 className="prod-page-card__name">{product.name}</h3>
      <p className="prod-page-card__tagline">{product.tagline}</p>
      <p className="prod-page-card__desc">{product.description}</p>

      <div className="prod-page-card__divider" />

      <ul className="prod-page-card__features">
        {product.features.map(f => (
          <li key={f}><Check size={12} /> {f}</li>
        ))}
      </ul>

      {/* Pricing table */}
      {product.pricing && product.pricing.length > 0 && (
        <div className="prod-page-card__pricing">
          {product.pricing.map(p => (
            <div key={p.label} className="prod-page-card__pricing-row">
              <span className="prod-page-card__pricing-label">{p.label}</span>
              <span className="prod-page-card__pricing-usd">{p.usd}</span>
              {p.vnd && <span className="prod-page-card__pricing-vnd">{p.vnd}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="prod-page-card__footer">
        {product.price === 0 ? (
          <div className="prod-page-card__price-wrap">
            <span className="prod-page-card__price prod-page-card__price--ticket">OPEN TICKET</span>
          </div>
        ) : (
          <div className="prod-page-card__price-wrap">
            <span className="prod-page-card__price">{product.pricing?.[0]?.usd || `$${product.price.toFixed(2)}`}</span>
            <span className="prod-page-card__period">starting</span>
          </div>
        )}

        <motion.button
          className="prod-page-card__cta"
          onClick={handleBuy}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.905 19.905 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          {product.price === 0 ? 'Open Ticket' : 'Buy on Discord'}
          <ExternalLink size={11} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => (
  <div className="page">
    <div className="page__hero">
      <div className="page__hero-glow" />
      <motion.div className="page__hero-content"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="badge badge--gold">{SITE_CONFIG.productsPage.badge}</div>
        <h1 className="display-xl">{SITE_CONFIG.productsPage.title} <span className="gold-text">{SITE_CONFIG.productsPage.titleGold}</span></h1>
        <p>{SITE_CONFIG.productsPage.subtitle}</p>
      </motion.div>
    </div>

    <div className="page__container">
      <div className="prod-page__grid">
        {displayProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  </div>
);

export default ProductsPage;
