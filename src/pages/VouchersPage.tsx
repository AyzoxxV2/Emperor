/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Upload, Send, X, CheckCircle, Lock, Image, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/content';
import toast from 'react-hot-toast';
import './VouchersPage.scss';

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

interface Voucher {
  id: string;
  username: string;
  discord_tag?: string;
  stars: number;
  text: string;
  image_url?: string;
  product_name?: string;
  created_at: string;
}

const StarRating: React.FC<{ value: number; onChange?: (v: number) => void; readonly?: boolean }> = ({ value, onChange, readonly }) => (
  <div className="star-rating">
    {[1,2,3,4,5].map(s => (
      <button
        key={s}
        type="button"
        className={`star-rating__star ${s <= value ? 'active' : ''} ${readonly ? 'readonly' : ''}`}
        onClick={() => !readonly && onChange && onChange(s)}
      >
        <Star size={readonly ? 14 : 20} fill={s <= value ? 'var(--gold)' : 'none'} color={s <= value ? 'var(--gold)' : 'rgba(255,255,255,0.2)'} />
      </button>
    ))}
  </div>
);

const VoucherCard: React.FC<{ voucher: Voucher; index: number }> = ({ voucher, index }) => {
  const [imgOpen, setImgOpen] = useState(false);
  const date = new Date(voucher.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      <motion.div
        className="voucher-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="voucher-card__header">
          <div className="voucher-card__avatar">
            {voucher.username.charAt(0).toUpperCase()}
          </div>
          <div className="voucher-card__user">
            <div className="voucher-card__name">{voucher.username}</div>
            {voucher.discord_tag && (
              <div className="voucher-card__discord">💬 {voucher.discord_tag}</div>
            )}
          </div>
          <div className="voucher-card__date">{date}</div>
        </div>

        {/* Stars */}
        <StarRating value={voucher.stars} readonly />

        {/* Product badge */}
        {voucher.product_name && (
          <div className="voucher-card__product">
            <span>✓</span> {voucher.product_name}
          </div>
        )}

        {/* Text */}
        <p className="voucher-card__text">"{voucher.text}"</p>

        {/* Screenshot */}
        {voucher.image_url && (
          <button className="voucher-card__img-wrap" onClick={() => setImgOpen(true)}>
            <img src={voucher.image_url} alt="proof" className="voucher-card__img" />
            <div className="voucher-card__img-overlay">
              <Image size={20} /> View proof
            </div>
          </button>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {imgOpen && (
          <motion.div className="voucher-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setImgOpen(false)}
          >
            <motion.img src={voucher.image_url} alt="proof"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            />
            <button className="voucher-lightbox__close" onClick={() => setImgOpen(false)}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SubmitForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    username: user?.name || '',
    discord_tag: '',
    stars: 5,
    text: '',
    product_name: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB', { style: toastStyle }); return; }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.text.trim()) { toast.error('Please write a testimonial', { style: toastStyle }); return; }
    if (!form.username.trim()) { toast.error('Please enter your username', { style: toastStyle }); return; }
    if (!user) return;

    setLoading(true);
    try {
      let image_url = null;

      // Upload image if provided
      if (image) {
        const ext = image.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('vouchers')
          .upload(path, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('vouchers').getPublicUrl(path);
        image_url = urlData.publicUrl;
      }

      const { error } = await supabase.from('vouchers').insert({
        user_id: user.id,
        username: form.username.trim(),
        discord_tag: form.discord_tag.trim() || null,
        stars: form.stars,
        text: form.text.trim(),
        product_name: form.product_name.trim() || null,
        image_url,
        approved: false,
      });

      if (error) throw error;

      setSubmitted(true);
      onSuccess();
      toast.success('Voucher submitted! Pending admin approval.', { style: toastStyle });
    } catch (e: any) {
      toast.error(e.message || 'Something went wrong', { style: toastStyle });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div className="submit-form__success"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle size={48} color="var(--green)" />
        <h3>Voucher submitted!</h3>
        <p>Your review is pending admin approval and will appear shortly.</p>
      </motion.div>
    );
  }

  const products = ['BOOSTER PRO', 'CLOUD SAVES', 'EMPEROR ELITE', 'STREAM TOOLS', 'LIFETIME ACCESS'];

  return (
    <div className="submit-form">
      <h3 className="submit-form__title">
        <MessageSquare size={18} /> Leave a Review
      </h3>

      <div className="submit-form__fields">
        <div className="submit-form__row">
          <div className="submit-form__field">
            <label>Username *</label>
            <input type="text" placeholder="YourName" value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>
          <div className="submit-form__field">
            <label>Discord Tag</label>
            <input type="text" placeholder="Name#1234 (optional)" value={form.discord_tag}
              onChange={e => setForm(f => ({ ...f, discord_tag: e.target.value }))} />
          </div>
        </div>

        <div className="submit-form__field">
          <label>Product purchased</label>
          <select value={form.product_name} onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))}>
            <option value="">Select a product (optional)</option>
            {products.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="submit-form__field">
          <label>Your rating *</label>
          <StarRating value={form.stars} onChange={v => setForm(f => ({ ...f, stars: v }))} />
        </div>

        <div className="submit-form__field">
          <label>Your review *</label>
          <textarea
            placeholder="Share your experience with Emperor..."
            value={form.text}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="submit-form__field">
          <label>Screenshot / Proof (optional)</label>
          <div className="submit-form__upload" onClick={() => fileRef.current?.click()}>
            {preview ? (
              <div className="submit-form__preview">
                <img src={preview} alt="preview" />
                <button type="button" onClick={e => { e.stopPropagation(); setImage(null); setPreview(null); }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={24} />
                <span>Click to upload screenshot</span>
                <small>PNG, JPG up to 5MB</small>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
        </div>
      </div>

      <motion.button
        className="submit-form__btn btn btn--gold"
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        {loading ? <div className="submit-form__spinner" /> : <><Send size={15} /> Submit Review</>}
      </motion.button>
    </div>
  );
};

const VouchersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState(0); // 0 = all stars

  const fetchVouchers = async () => {
    const { data } = await supabase
      .from('vouchers')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (data) setVouchers(data);
    setLoading(false);
  };

  useEffect(() => { fetchVouchers(); }, []);

  const filtered = filter === 0 ? vouchers : vouchers.filter(v => v.stars === filter);

  const avgStars = vouchers.length
    ? (vouchers.reduce((s, v) => s + v.stars, 0) / vouchers.length).toFixed(1)
    : '5.0';

  return (
    <div className="page">
      {/* Hero */}
      <div className="page__hero">
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="badge badge--gold">{SITE_CONFIG.vouchersPage.badge}</div>
          <h1 className="display-xl">{SITE_CONFIG.vouchersPage.title} <span className="gold-text">{SITE_CONFIG.vouchersPage.titleGold}</span></h1>
          <p>{SITE_CONFIG.vouchersPage.subtitle}</p>

          {/* Stats */}
          <div className="vouchers-page__stats">
            <div className="vouchers-page__stat">
              <span className="vouchers-page__stat-val">{avgStars}★</span>
              <span className="vouchers-page__stat-label">Average Rating</span>
            </div>
            <div className="vouchers-page__stat">
              <span className="vouchers-page__stat-val">{vouchers.length}</span>
              <span className="vouchers-page__stat-label">{SITE_CONFIG.vouchersPage.statLabels.totalReviews}</span>
            </div>
            <div className="vouchers-page__stat">
              <span className="vouchers-page__stat-val">100%</span>
              <span className="vouchers-page__stat-label">{SITE_CONFIG.vouchersPage.statLabels.verifiedPurchases}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="page__container">
        {/* Actions bar */}
        <div className="vouchers-page__bar">
          {/* Star filter */}
          <div className="vouchers-page__filters">
            <button className={`vouchers-page__filter ${filter === 0 ? 'active' : ''}`} onClick={() => setFilter(0)}>
              All
            </button>
            {[5,4,3].map(s => (
              <button key={s} className={`vouchers-page__filter ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                {s}★
              </button>
            ))}
          </div>

          {/* Submit button */}
          {isAuthenticated ? (
            <button className="btn btn--gold vouchers-page__submit-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? <><X size={14} /> Cancel</> : <><Star size={14} /> Leave a Review</>}
            </button>
          ) : (
            <div className="vouchers-page__login-notice">
              <Lock size={13} /> {SITE_CONFIG.vouchersPage.loginNotice}
            </div>
          )}
        </div>

        {/* Submit form */}
        <AnimatePresence>
          {showForm && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="vouchers-page__form-wrap"
            >
              <SubmitForm onSuccess={() => { fetchVouchers(); setTimeout(() => setShowForm(false), 2000); }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div className="vouchers-page__loading">
            <div className="vouchers-page__spinner" />
            <p>Loading reviews...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="vouchers-page__empty">
            <span>⭐</span>
            <h3>{SITE_CONFIG.vouchersPage.emptyTitle}</h3>
            <p>{SITE_CONFIG.vouchersPage.emptySubtitle}</p>
          </div>
        ) : (
          <div className="vouchers-page__grid">
            {filtered.map((v, i) => <VoucherCard key={v.id} voucher={v} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default VouchersPage;
