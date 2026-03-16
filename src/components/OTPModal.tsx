/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import './OTPModal.scss';

interface OTPModalProps {
  isOpen: boolean;
  email: string;
  onSuccess: () => void;
  onClose: () => void;
}

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, email, onSuccess, onClose }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    setError('');
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(iv); setCanResend(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [isOpen]);

  const handleInput = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...code];
    next[i] = val.slice(-1);
    setCode(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      inputs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length !== 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    setLoading(false);
    if (error) {
      setError('Invalid or expired code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
      return;
    }
    toast.success('Verified! Welcome back ⚡', { style: toastStyle });
    onSuccess();
  };

  const handleResend = async () => {
    if (!canResend) return;
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) { toast.error('Failed to resend. Try again.', { style: toastStyle }); return; }
    toast.success('New code sent!', { style: toastStyle });
    setCountdown(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(iv); setCanResend(true); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="otp-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div className="otp-modal"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <div className="otp-modal__glow" />
            <button className="otp-modal__close" onClick={onClose}><X size={16} /></button>

            <div className="otp-modal__logo">
              <img src="/emperor/emperor_bot_avatar_ani.gif" alt="Emperor"
                style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(232,168,0,0.4)' }} />
              <span>EMPEROR</span>
            </div>

            <div className="otp-modal__icon">
              <Mail size={32} color="var(--gold)" />
            </div>

            <div className="otp-modal__heading">
              <h2>Check your email</h2>
              <p>We sent a 6-digit code to</p>
              <div className="otp-modal__email">{email}</div>
            </div>

            {error && (
              <div className="otp-modal__error">{error}</div>
            )}

            {/* OTP inputs */}
            <div className="otp-modal__inputs" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputs.current[i] = el; }}
                  className={`otp-modal__input ${digit ? 'filled' : ''}`}
                  type="text" inputMode="numeric"
                  maxLength={1} value={digit}
                  onChange={e => handleInput(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <motion.button
              className="otp-modal__submit"
              onClick={handleVerify} disabled={loading || code.join('').length !== 6}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              {loading
                ? <div className="otp-modal__spinner" />
                : <>Verify <ArrowRight size={15} /></>
              }
            </motion.button>

            <div className="otp-modal__resend">
              {canResend ? (
                <button onClick={handleResend}>
                  <RefreshCw size={13} /> Resend code
                </button>
              ) : (
                <span>Resend code in <strong>{countdown}s</strong></span>
              )}
            </div>

            <p className="otp-modal__note">
              Check your spam folder if you don't see it.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OTPModal;
