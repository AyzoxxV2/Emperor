import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Lock, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import toast from 'react-hot-toast';
import './Cart.scss';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthOpen: (mode: 'login' | 'register') => void;
}

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onAuthOpen }) => {
  const { items, updateQty, removeItem, clearCart, total, count } = useCart();
  const { isAuthenticated } = useAuth();
  const { placeOrder, placing } = useOrders();
  const [purchased, setPurchased] = useState(false);
  const [orderNum, setOrderNum] = useState('');

  const handleRemove = (id: number) => {
    removeItem(id);
    toast('Item removed', { icon: '🗑️', style: toastStyle, duration: 1500 });
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      onClose();
      onAuthOpen('login');
      toast('Please sign in to complete your purchase.', { icon: '🔒', style: toastStyle });
      return;
    }

    const result = await placeOrder(items);
    if (!result.success) {
      toast.error(result.error || 'Purchase failed. Try again.', { style: toastStyle });
      return;
    }

    const num = `EM-${Math.floor(Math.random() * 90000 + 10000)}`;
    setOrderNum(num);
    setPurchased(true);
    clearCart();
    toast.success('Order confirmed! Welcome to the Empire 👑', { style: toastStyle, duration: 4000 });
    await new Promise(r => setTimeout(r, 3000));
    setPurchased(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="cart-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div className="cart-drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="cart-drawer__header">
              <div className="cart-drawer__title-wrap">
                <ShoppingBag size={18} color="var(--gold)" />
                <h3 className="cart-drawer__title">Cart</h3>
                {count > 0 && (
                  <motion.span className="cart-drawer__count" key={count}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >{count}</motion.span>
                )}
              </div>
              <button className="btn btn--icon" onClick={onClose}><X size={16} /></button>
            </div>
            <div className="divider" style={{ margin: 0 }} />

            <AnimatePresence mode="wait">
              {purchased ? (
                <motion.div key="success" className="cart-drawer__success"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                >
                  <div className="cart-drawer__success-icon">
                    <svg viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="28" stroke="var(--green)" strokeWidth="1.5" />
                      <motion.path d="M18 30 L26 38 L42 22" stroke="var(--green)" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </svg>
                  </div>
                  <h3>Order confirmed!</h3>
                  <p>Your order was saved to your account.<br />You'll receive a confirmation email shortly.</p>
                  <div className="cart-drawer__order-num">Order #{orderNum}</div>
                </motion.div>
              ) : items.length === 0 ? (
                <motion.div key="empty" className="cart-drawer__empty"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                >
                  <div className="cart-drawer__empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Explore our plans and level up your game</p>
                  <button className="btn btn--gold" onClick={onClose}>
                    Browse Plans <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="items" className="cart-drawer__body">
                  <div className="cart-drawer__items">
                    <AnimatePresence>
                      {items.map(item => (
                        <motion.div key={item.id} className="cart-item" layout
                          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                          <div className="cart-item__emoji">{item.icon}</div>
                          <div className="cart-item__info">
                            <div className="cart-item__name">{item.name}</div>
                            <div className="cart-item__cat">{item.category}</div>
                            <div className="cart-item__price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="cart-item__controls">
                            <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>
                              <Minus size={12} />
                            </button>
                            <span className="cart-item__qty">{item.quantity}</span>
                            <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>
                          <button className="cart-item__remove" onClick={() => handleRemove(item.id)}>
                            <Trash2 size={13} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="cart-drawer__footer">
                    {!isAuthenticated && (
                      <div className="cart-drawer__auth-notice">
                        <LogIn size={14} />
                        <span>Sign in to complete your purchase</span>
                      </div>
                    )}

                    <div className="cart-drawer__summary">
                      <div className="cart-drawer__row">
                        <span>Subtotal</span><span>${total.toFixed(2)}</span>
                      </div>
                      <div className="cart-drawer__row">
                        <span>Shipping</span><span className="cart-drawer__free">Free</span>
                      </div>
                      <div className="divider" style={{ margin: '8px 0' }} />
                      <div className="cart-drawer__row cart-drawer__row--total">
                        <span>Total</span>
                        <span className="gold-text">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                      className={`cart-drawer__checkout-btn ${placing ? 'loading' : ''}`}
                      onClick={handlePurchase} disabled={placing}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    >
                      {placing ? (
                        <div className="cart-drawer__loader" />
                      ) : isAuthenticated ? (
                        <><Lock size={14} /> Pay now — ${total.toFixed(2)} <ArrowRight size={14} /></>
                      ) : (
                        <><LogIn size={14} /> Sign in to purchase</>
                      )}
                    </motion.button>

                    <div className="cart-drawer__trust">
                      <span>🔒 SSL Secure</span>
                      <span>🚀 Instant access</span>
                      <span>↩️ 30-day refund</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
