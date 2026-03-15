/* eslint-disable */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, Crown, ExternalLink } from 'lucide-react';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Pages.scss';

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

const categories = ['All', 'Launcher', 'Optimizer', 'Cloud', 'Bundle', 'Streaming', 'Lifetime'];

const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }> = ({ product, onAdd }) => {
  const [adding, setAdding] = useState(false);
  const handleAdd = () => { if (product.isFree) { window.open(product.discordUrl || "https://discord.gg/TjXbYS9DZu", "_blank"); return; } setAdding(true); onAdd(product); setTimeout(() => setAdding(false), 900); };

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

      <div className="prod-page-card__footer">
        <div className="prod-page-card__price-wrap">
          {product.price === 0 ? (
            <span className="prod-page-card__price prod-page-card__price--free">FREE</span>
          ) : (
            <>
              <span className="prod-page-card__price">${product.price.toFixed(2)}</span>
              <span className="prod-page-card__period">/mo</span>
            </>
          )}
          {product.originalPrice && (
            <span className="prod-page-card__original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <motion.button
          className={`prod-page-card__cta ${product.popular ? 'btn btn--gold' : 'btn btn--outline'} ${adding ? 'prod-page-card__cta--added' : ''}`}
          onClick={handleAdd} whileTap={{ scale: 0.97 }}
        >
          {adding ? '✓ Added!' : product.price === 0 ? <><Zap size={14} /> Download Free</> : <><ShoppingBag size={14} /> Add to Cart</>}
        </motion.button>
      </div>

      <div className="prod-page-card__rating">
        {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="var(--gold)" color="var(--gold)" />)}
        <span>4.{Math.floor(Math.random() * 4 + 6)} rating</span>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  const handleAdd = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added!`, { icon: product.icon, style: toastStyle });
  };

  return (
    <div className="page">
      <div className="page__hero">
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="badge badge--gold">Full Catalog</div>
          <h1 className="display-xl">Our <span className="gold-text">Products</span></h1>
          <p>Everything you need to dominate your game.</p>
        </motion.div>
      </div>

      <div className="page__container">
        {/* Category filter */}
        <div className="prod-page__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`prod-page__filter ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="prod-page__grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
