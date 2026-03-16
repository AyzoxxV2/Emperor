/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Check, X, Trash2, Users, Star, ShoppingBag, Eye, EyeOff, RefreshCw, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Pages.scss';
import './AdminPage.scss';

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

interface Voucher {
  id: string; user_id: string; username: string; discord_tag: string;
  stars: number; text: string; image_url?: string; product_name?: string;
  approved: boolean; created_at: string;
}

interface UserProfile {
  id: string; username: string; email?: string;
  plan: string; is_admin: boolean; created_at: string;
}

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<'overview' | 'vouchers' | 'users'>('overview');
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalVouchers: 0, pendingVouchers: 0, approvedVouchers: 0 });

  // Redirect if not admin
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;
  if (!user.is_admin) return <Navigate to="/" replace />;

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch ALL vouchers (admin can see all)
      const { data: vData } = await supabase
        .from('vouchers').select('*').order('created_at', { ascending: false });

      // Fetch all profiles
      const { data: uData } = await supabase
        .from('profiles').select('*').order('created_at', { ascending: false });

      if (vData) {
        setVouchers(vData);
        setStats(s => ({
          ...s,
          totalVouchers: vData.length,
          pendingVouchers: vData.filter(v => !v.approved).length,
          approvedVouchers: vData.filter(v => v.approved).length,
        }));
      }
      if (uData) {
        setUsers(uData);
        setStats(s => ({ ...s, totalUsers: uData.length }));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const approveVoucher = async (id: string, approved: boolean) => {
    const { error } = await supabase.from('vouchers').update({ approved }).eq('id', id);
    if (error) { toast.error('Failed to update voucher', { style: toastStyle }); return; }
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, approved } : v));
    toast.success(approved ? 'Voucher approved ✓' : 'Voucher hidden', { style: toastStyle });
  };

  const deleteVoucher = async (id: string) => {
    if (!window.confirm('Delete this voucher permanently?')) return;
    const { error } = await supabase.from('vouchers').delete().eq('id', id);
    if (error) { toast.error('Failed to delete', { style: toastStyle }); return; }
    setVouchers(prev => prev.filter(v => v.id !== id));
    toast.success('Voucher deleted', { style: toastStyle });
  };

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (userId === user.id) { toast.error("Can't remove your own admin role", { style: toastStyle }); return; }
    const { error } = await supabase.from('profiles').update({ is_admin: isAdmin }).eq('id', userId);
    if (error) { toast.error('Failed to update', { style: toastStyle }); return; }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_admin: isAdmin } : u));
    toast.success(isAdmin ? 'Admin granted' : 'Admin removed', { style: toastStyle });
  };

  const changePlan = async (userId: string, plan: string) => {
    const { error } = await supabase.from('profiles').update({ plan }).eq('id', userId);
    if (error) { toast.error('Failed to update plan', { style: toastStyle }); return; }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan } : u));
    toast.success(`Plan updated to ${plan.toUpperCase()}`, { style: toastStyle });
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <Users size={22} />, color: '#00D4FF' },
    { label: 'Total Vouchers', value: stats.totalVouchers, icon: <Star size={22} />, color: '#FFD700' },
    { label: 'Pending Approval', value: stats.pendingVouchers, icon: <Eye size={22} />, color: '#FF6B35' },
    { label: 'Approved', value: stats.approvedVouchers, icon: <Check size={22} />, color: '#00FF87' },
  ];

  return (
    <div className="page">
      <div className="page__hero" style={{ minHeight: '28vh' }}>
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="badge badge--red"><Shield size={10} /><span>ADMIN PANEL</span></div>
          <h1 className="display-lg">Emperor <span className="gold-text">Admin</span></h1>
          <p>Welcome back, {user.name}. Manage your platform.</p>
        </motion.div>
      </div>

      <div className="page__container">
        {/* Tab nav */}
        <div className="admin__tabs">
          {(['overview', 'vouchers', 'users'] as const).map(t => (
            <button key={t} className={`admin__tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'vouchers' && stats.pendingVouchers > 0 && (
                <span className="admin__tab-badge">{stats.pendingVouchers}</span>
              )}
            </button>
          ))}
          <button className="admin__refresh" onClick={fetchAll}>
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="admin__overview">
            <div className="admin__stats-grid">
              {statCards.map((s, i) => (
                <motion.div key={s.label} className="admin__stat-card"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ '--stat-color': s.color } as React.CSSProperties}
                >
                  <div className="admin__stat-icon">{s.icon}</div>
                  <div className="admin__stat-val">{s.value}</div>
                  <div className="admin__stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent pending vouchers */}
            <div className="admin__section">
              <h3 className="admin__section-title">⏳ Pending Vouchers</h3>
              {vouchers.filter(v => !v.approved).length === 0 ? (
                <p className="admin__empty">No pending vouchers — all caught up! ✅</p>
              ) : (
                vouchers.filter(v => !v.approved).slice(0, 5).map(v => (
                  <div key={v.id} className="admin__voucher-row">
                    <div className="admin__voucher-info">
                      <strong>{v.username}</strong>
                      {v.discord_tag && <span className="admin__discord-tag">💬 {v.discord_tag}</span>}
                      <span className="admin__stars">{'★'.repeat(v.stars)}</span>
                      {v.product_name && <span className="admin__product-badge">{v.product_name}</span>}
                      <p className="admin__voucher-text">"{v.text}"</p>
                    </div>
                    {v.image_url && (
                      <img src={v.image_url} alt="proof" className="admin__voucher-thumb" onClick={() => window.open(v.image_url, '_blank')} />
                    )}
                    <div className="admin__voucher-actions">
                      <button className="admin__btn admin__btn--approve" onClick={() => approveVoucher(v.id, true)}>
                        <Check size={14} /> Approve
                      </button>
                      <button className="admin__btn admin__btn--delete" onClick={() => deleteVoucher(v.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Vouchers tab */}
        {tab === 'vouchers' && (
          <div className="admin__section">
            <h3 className="admin__section-title">All Vouchers ({vouchers.length})</h3>
            <AnimatePresence>
              {vouchers.map((v, i) => (
                <motion.div key={v.id} className={`admin__voucher-row ${v.approved ? '' : 'admin__voucher-row--pending'}`}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="admin__voucher-info">
                    <div className="admin__voucher-header">
                      <strong>{v.username}</strong>
                      {v.discord_tag && <span className="admin__discord-tag">💬 {v.discord_tag}</span>}
                      <span className="admin__stars">{'★'.repeat(v.stars)}</span>
                      {v.product_name && <span className="admin__product-badge">{v.product_name}</span>}
                      <span className={`admin__status ${v.approved ? 'approved' : 'pending'}`}>
                        {v.approved ? '✓ Approved' : '⏳ Pending'}
                      </span>
                    </div>
                    <p className="admin__voucher-text">"{v.text}"</p>
                    <span className="admin__date">{new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  {v.image_url && (
                    <img src={v.image_url} alt="proof" className="admin__voucher-thumb" onClick={() => window.open(v.image_url, '_blank')} />
                  )}
                  <div className="admin__voucher-actions">
                    {v.approved ? (
                      <button className="admin__btn admin__btn--hide" onClick={() => approveVoucher(v.id, false)}>
                        <EyeOff size={14} /> Hide
                      </button>
                    ) : (
                      <button className="admin__btn admin__btn--approve" onClick={() => approveVoucher(v.id, true)}>
                        <Check size={14} /> Approve
                      </button>
                    )}
                    <button className="admin__btn admin__btn--delete" onClick={() => deleteVoucher(v.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <div className="admin__section">
            <h3 className="admin__section-title">All Users ({users.length})</h3>
            {users.map((u, i) => (
              <motion.div key={u.id} className="admin__user-row"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="admin__user-avatar">{u.username?.charAt(0).toUpperCase() || '?'}</div>
                <div className="admin__user-info">
                  <div className="admin__user-name">
                    {u.username}
                    {u.is_admin && <span className="admin__admin-badge"><Shield size={10} /> Admin</span>}
                  </div>
                  <div className="admin__user-meta">
                    <span className={`admin__plan-badge admin__plan-badge--${u.plan}`}>{u.plan?.toUpperCase()}</span>
                    <span className="admin__date">Joined {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="admin__user-actions">
                  <select
                    className="admin__plan-select"
                    value={u.plan}
                    onChange={e => changePlan(u.id, e.target.value)}
                  >
                    {['free', 'pro', 'elite', 'lifetime'].map(p => (
                      <option key={p} value={p}>{p.toUpperCase()}</option>
                    ))}
                  </select>
                  {u.id !== user.id && (
                    <button
                      className={`admin__btn ${u.is_admin ? 'admin__btn--hide' : 'admin__btn--approve'}`}
                      onClick={() => toggleAdmin(u.id, !u.is_admin)}
                    >
                      <Shield size={13} /> {u.is_admin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
