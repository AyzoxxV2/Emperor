import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, ArrowRight, Lock, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/content';
import toast from 'react-hot-toast';
import './AuthModal.scss';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

type ModalState = 'form' | 'pending_email' | 'success_login';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose, onSwitchMode }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('form');
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { login, register } = useAuth();
  const isReg = mode === 'register';
  const cfg = SITE_CONFIG.auth;

  const handleClose = () => {
    setModalState('form');
    setError('');
    setForm({ username: '', email: '', password: '' });
    onClose();
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (isReg && !form.username.trim()) { setError('Please enter a username.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    // Safety timeout — never hang forever
    const timeout = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, 10000);

    try {
      const result = isReg
        ? await register(form.username.trim(), form.email, form.password)
        : await login(form.email, form.password);
      clearTimeout(timeout);
      setLoading(false);

      if (result.error) {
        const msg = result.error
          .replace('Invalid login credentials', 'Incorrect email or password.')
          .replace('User already registered', 'An account with this email already exists.')
          .replace('Email not confirmed', 'Please confirm your email before signing in.');
        setError(msg);
        return;
      }

      if (isReg) {
        setSubmittedEmail(form.email);
        setModalState('pending_email');
      } else {
        setModalState('success_login');
        toast.success(cfg.successLogin, { style: toastStyle });
        await new Promise(r => setTimeout(r, 1000));
        handleClose();
      }
    } catch (e: any) {
      clearTimeout(timeout);
      setLoading(false);
      setError(e?.message || 'Something went wrong. Please try again.');
    }
    return; // prevent double execution of old code below
    // eslint-disable-next-line no-unreachable
    
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="auth-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div className="auth-modal"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <div className="auth-modal__glow" />
            <button className="auth-modal__close" onClick={handleClose}><X size={16} /></button>

            <div className="auth-modal__logo">
              <img src={SITE_CONFIG.brand.logoGif} alt="Emperor"
                style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(232,168,0,0.4)' }} />
              <span>{SITE_CONFIG.brand.name}</span>
            </div>

            <AnimatePresence mode="wait">

              {/* ── Pending email confirmation ── */}
              {modalState === 'pending_email' && (
                <motion.div key="pending" className="auth-modal__pending"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="auth-modal__pending-icon">📧</div>
                  <h3>{cfg.register.pendingTitle}</h3>
                  <p>{cfg.register.pendingSubtitle}</p>
                  <div className="auth-modal__pending-email">{submittedEmail}</div>
                  <div className="auth-modal__pending-note">
                    <span>📁</span> {cfg.register.pendingNote}
                  </div>
                  <div className="auth-modal__pending-tip">{cfg.register.pendingSpamTip}</div>
                  <button className="auth-modal__pending-close btn btn--gold" onClick={handleClose}>
                    Got it!
                  </button>
                  <button className="auth-modal__pending-resend" onClick={async () => {
                    const { supabase } = await import('../lib/supabase');
                    await supabase.auth.resend({ type: 'signup', email: submittedEmail });
                    toast.success('Confirmation email resent!', { style: toastStyle });
                  }}>
                    Didn't receive it? Resend email
                  </button>
                </motion.div>
              )}

              {/* ── Success login ── */}
              {modalState === 'success_login' && (
                <motion.div key="success" className="auth-modal__success"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="auth-modal__success-ring">
                    <svg viewBox="0 0 60 60" fill="none" width="70" height="70">
                      <circle cx="30" cy="30" r="28" stroke="var(--gold)" strokeWidth="1.5" />
                      <motion.path d="M18 30 L26 38 L42 22" stroke="var(--gold)" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </svg>
                  </div>
                  <h3>Welcome back!</h3>
                  <p>You are now signed in to Emperor.</p>
                </motion.div>
              )}

              {/* ── Main form ── */}
              {modalState === 'form' && (
                <motion.div key={mode} className="auth-modal__form"
                  initial={{ opacity: 0, x: isReg ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="auth-modal__heading">
                    <h2>{isReg ? cfg.register.title : cfg.login.title}</h2>
                    <p>{isReg ? cfg.register.subtitle : cfg.login.subtitle}</p>
                  </div>

                  {error && (
                    <div className="auth-modal__error">
                      <AlertCircle size={14} /> {error}
                    </div>
                  )}

                  <div className="auth-modal__fields">
                    {isReg && (
                      <div className="auth-field">
                        <label>Username</label>
                        <div className="auth-field__wrap">
                          <User size={15} className="auth-field__icon" />
                          <input type="text" placeholder="CoolGamer99" value={form.username}
                            onChange={set('username')} autoComplete="username" />
                        </div>
                      </div>
                    )}
                    <div className="auth-field">
                      <label>Email</label>
                      <div className="auth-field__wrap">
                        <Mail size={15} className="auth-field__icon" />
                        <input type="email" placeholder="you@example.com" value={form.email}
                          onChange={set('email')} autoComplete="email" />
                      </div>
                    </div>
                    <div className="auth-field">
                      <label>Password</label>
                      <div className="auth-field__wrap">
                        <Lock size={15} className="auth-field__icon" />
                        <input
                          type={showPwd ? 'text' : 'password'}
                          placeholder={isReg ? 'Min. 6 characters' : '••••••••'}
                          value={form.password} onChange={set('password')}
                          autoComplete={isReg ? 'new-password' : 'current-password'}
                          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                        <button type="button" className="auth-field__toggle"
                          onClick={() => setShowPwd(v => !v)}>
                          {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {!isReg && (
                    <button className="auth-modal__forgot" onClick={() => {
                      if (!form.email) { setError('Enter your email above first.'); return; }
                      import('../lib/supabase').then(({ supabase }) => {
                        supabase.auth.resetPasswordForEmail(form.email);
                        toast.success('Password reset email sent!', { style: toastStyle });
                      });
                    }}>
                      Forgot password?
                    </button>
                  )}

                  <motion.button className="auth-modal__submit"
                    onClick={handleSubmit} disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  >
                    {loading
                      ? <div className="auth-modal__spinner" />
                      : <>{isReg ? cfg.register.submitLabel : cfg.login.submitLabel} <ArrowRight size={15} /></>
                    }
                  </motion.button>

                  <div className="auth-modal__switch">
                    {isReg ? cfg.register.switchText : cfg.login.switchText}
                    <button onClick={() => { setError(''); onSwitchMode(isReg ? 'login' : 'register'); }}>
                      {isReg ? cfg.register.switchLabel : cfg.login.switchLabel}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
