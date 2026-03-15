import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, ShoppingBag, ExternalLink } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Pages.scss';

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

const comparisonRows = [
  { feature: 'Game Launcher', free: true, pro: true, elite: true },
  { feature: 'Basic FPS Optimization', free: true, pro: true, elite: true },
  { feature: 'Community Support', free: true, pro: true, elite: true },
  { feature: 'Advanced FPS Booster (+40%)', free: false, pro: true, elite: true },
  { feature: 'Network Latency Reducer', free: false, pro: true, elite: true },
  { feature: 'Priority Support 24/7', free: false, pro: true, elite: true },
  { feature: 'Cloud Saves (500 GB)', free: false, pro: false, elite: true },
  { feature: 'VIP Discord Server', free: false, pro: false, elite: true },
  { feature: 'Early Beta Access', free: false, pro: false, elite: true },
  { feature: 'Per-Game Profiles', free: false, pro: true, elite: true },
  { feature: 'Performance Analytics', free: false, pro: true, elite: true },
  { feature: 'Dedicated Discord Support', free: false, pro: false, elite: true },
  { feature: 'In-Game Overlay', free: true, pro: true, elite: true },
  { feature: 'Stream Tools', free: false, pro: false, elite: true },
];

const faq = [
  { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade at any time. Changes take effect on your next billing cycle.' },
  { q: 'Is there a free trial for paid plans?', a: 'Our Free plan is permanent and has no trial expiry. For Pro and Elite, we offer a 7-day money-back guarantee.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and cryptocurrency (BTC, ETH, LTC).' },
  { q: 'Does Lifetime Access include future features?', a: 'Absolutely. Lifetime Access includes every feature we ever release, forever.' },
];

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart } = useCart();

  const mainPlans = products.filter(p => [1, 2, 4, 6].includes(p.id));

  const handleAdd = (product: any) => { if (product.isFree) { window.open("https://discord.gg/TjXbYS9DZu", "_blank"); return; }
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { icon: product.icon, style: toastStyle });
  };

  const getYearlyPrice = (price: number) => (price * 12 * 0.75).toFixed(2);

  return (
    <div className="page">
      <div className="page__hero">
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="badge badge--gold">Simple Pricing</div>
          <h1 className="display-xl">Choose your <span className="gold-text">Plan</span></h1>
          <p>No hidden fees. Cancel anytime.</p>

          {/* Billing toggle */}
          <div className="pricing-page__toggle">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            <button className={billingCycle === 'yearly' ? 'active' : ''} onClick={() => setBillingCycle('yearly')}>
              Yearly <span className="pricing-page__save">Save 25%</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="page__container">
        {/* Plans grid */}
        <div className="pricing-page__grid">
          {mainPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={`pricing-page__card ${plan.popular ? 'pricing-page__card--popular' : ''}`}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {plan.popular && <div className="pricing-page__popular-label"><Crown size={12} /> Most Popular</div>}
              <div className="pricing-page__plan-header">
                <span className="pricing-page__plan-icon">{plan.icon}</span>
                <div>
                  <div className="pricing-page__plan-name">{plan.name}</div>
                  <div className="pricing-page__plan-cat label-mono">{plan.category}</div>
                </div>
              </div>

              <div className="pricing-page__price-wrap">
                {plan.price === 0 ? (
                  <span className="pricing-page__price pricing-page__price--free">FREE</span>
                ) : plan.id === 6 ? (
                  <><span className="pricing-page__price">${plan.price.toFixed(2)}</span><span className="pricing-page__period"> one-time</span></>
                ) : (
                  <>
                    <span className="pricing-page__price">
                      ${billingCycle === 'yearly' ? getYearlyPrice(plan.price) : plan.price.toFixed(2)}
                    </span>
                    <span className="pricing-page__period">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                  </>
                )}
                {plan.originalPrice && <span className="pricing-page__original">${plan.originalPrice.toFixed(2)}</span>}
              </div>

              <p className="pricing-page__plan-desc">{plan.tagline}</p>

              <ul className="pricing-page__features">
                {plan.features.map(f => (
                  <li key={f}><Check size={13} /> {f}</li>
                ))}
              </ul>

              <button
                className={`pricing-page__cta ${plan.popular ? 'btn btn--gold' : 'btn btn--outline'}`}
                onClick={() => handleAdd(plan)}
              >
                {plan.isFree ? <><ExternalLink size={14} /> Join Discord</> : <><ShoppingBag size={14} /> Get Started</>}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div className="pricing-page__comparison"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <h2 className="display-lg" style={{ textAlign: 'center', marginBottom: 40 }}>
            Full <span className="gold-text">Comparison</span>
          </h2>
          <div className="pricing-page__table">
            <div className="pricing-page__table-header">
              <div>Feature</div>
              <div>Free</div>
              <div>Pro</div>
              <div className="pricing-page__table-elite">Elite 👑</div>
            </div>
            {comparisonRows.map((row, i) => (
              <motion.div key={row.feature} className="pricing-page__table-row"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              >
                <div className="pricing-page__table-feature">{row.feature}</div>
                <div>{row.free ? <Check size={16} color="var(--green)" /> : <X size={16} color="rgba(255,255,255,0.2)" />}</div>
                <div>{row.pro ? <Check size={16} color="var(--gold)" /> : <X size={16} color="rgba(255,255,255,0.2)" />}</div>
                <div>{row.elite ? <Check size={16} color="var(--gold-bright)" /> : <X size={16} color="rgba(255,255,255,0.2)" />}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="pricing-page__faq">
          <h2 className="display-lg" style={{ textAlign: 'center', marginBottom: 32 }}>
            Pricing <span className="gold-text">FAQ</span>
          </h2>
          {faq.map((item, i) => (
            <div key={i} className={`pricing-page__faq-item ${openFaq === i ? 'open' : ''}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span>
                <span className="pricing-page__faq-arrow">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p>{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
