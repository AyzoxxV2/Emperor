import React from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Crown, Zap, Cloud, Shield, ExternalLink, Settings, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Pages.scss';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  const planColors: Record<string, string> = { free: '#00FF87', pro: '#FFD700', elite: '#FFD700', lifetime: '#FFD700' };

  const stats = [
    { icon: <Zap size={20} />, label: 'Sessions', value: '47' },
    { icon: <Cloud size={20} />, label: 'Cloud Saves', value: '12 GB' },
    { icon: <Shield size={20} />, label: 'Uptime', value: '99.9%' },
    { icon: <Crown size={20} />, label: 'Plan', value: user.plan.toUpperCase() },
  ];

  return (
    <div className="page">
      <div className="page__hero" style={{ minHeight: '30vh' }}>
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <img src={user.avatar} alt={user.name}
            style={{ width: 72, height: 72, borderRadius: '50%', border: '2px solid var(--gold-border)', margin: '0 auto 16px' }}
          />
          <div className="badge badge--gold" style={{ margin: '0 auto 12px' }}>{user.plan.toUpperCase()} MEMBER</div>
          <h1 className="display-lg">Welcome back, <span className="gold-text">{user.name}</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Member since {user.joinedAt} · {user.email}</p>
        </motion.div>
      </div>

      <div className="page__container">
        {/* Stats */}
        <div className="dashboard__stats">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="dashboard__stat"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            >
              <div className="dashboard__stat-icon" style={{ color: planColors[user.plan] }}>{s.icon}</div>
              <div className="dashboard__stat-val">{s.value}</div>
              <div className="dashboard__stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="dashboard__grid">
          <motion.div className="dashboard__card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><Download size={18} /> Download Emperor</h3>
            <p>Get the latest version of the Emperor launcher for Windows.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn--gold" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                <Download size={14} /> Windows (64-bit)
              </button>
            </div>
            <div className="dashboard__version">v2.4.1 — Released March 2025</div>
          </motion.div>

          <motion.div className="dashboard__card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3><Crown size={18} /> Your Plan</h3>
            <p>You're on the <strong style={{ color: planColors[user.plan] }}>{user.plan.toUpperCase()}</strong> plan.</p>
            {user.plan === 'free' && (
              <div className="dashboard__upgrade">
                <p>Upgrade to unlock Booster PRO, priority support and more.</p>
                <a href="/pricing" className="btn btn--gold" style={{ fontSize: '0.85rem', padding: '10px 20px', display: 'inline-flex', marginTop: 12 }}>
                  <Zap size={14} /> Upgrade Now
                </a>
              </div>
            )}
            {user.plan !== 'free' && <div className="dashboard__plan-badge">🎉 Enjoy all your premium features!</div>}
          </motion.div>

          <motion.div className="dashboard__card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3><Settings size={18} /> Quick Links</h3>
            <div className="dashboard__links">
              {[
                { label: 'Discord Server', url: 'https://discord.gg/TjXbYS9DZu', icon: '💬' },
                { label: 'Documentation', url: '#', icon: '📖' },
                { label: 'Changelog', url: '#', icon: '📋' },
                { label: 'Report a Bug', url: '#', icon: '🐛' },
              ].map(link => (
                <a key={link.label} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" className="dashboard__link"
                >
                  <span>{link.icon}</span> {link.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
