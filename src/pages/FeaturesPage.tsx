/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cloud, Monitor, Cpu, Wifi, Lock, BarChart2, Settings, Users } from 'lucide-react';
import './Pages.scss';

const mainFeatures = [
  {
    icon: <Zap size={28} />, title: 'Ultra-Fast Launcher',
    desc: 'Launch any game in under a second. Emperor pre-loads your favorite titles and optimizes system resources automatically before you even click play.',
    tag: 'Performance'
  },
  {
    icon: <Cpu size={28} />, title: 'AI-Powered Optimization',
    desc: 'Our AI engine analyzes your hardware in real-time and adjusts CPU, GPU, and RAM allocation for maximum FPS. No manual tweaking required.',
    tag: 'AI'
  },
  {
    icon: <Cloud size={28} />, title: 'Cloud Game Saves',
    desc: 'Every save is automatically backed up to our servers. Switch PCs, reinstall Windows, lose your drive — your progress is always safe.',
    tag: 'Cloud'
  },
  {
    icon: <Wifi size={28} />, title: 'Network Booster',
    desc: 'Proprietary routing algorithms reduce ping and packet loss. Emperor finds the fastest path to game servers so you never blame lag again.',
    tag: 'Network'
  },
  {
    icon: <Monitor size={28} />, title: 'In-Game Overlay',
    desc: 'A sleek, non-intrusive overlay shows FPS, ping, GPU temp, and RAM usage. Customize it to show exactly what you need, where you need it.',
    tag: 'HUD'
  },
  {
    icon: <Shield size={28} />, title: 'Privacy First',
    desc: 'We never collect gameplay data or share your information. Emperor runs locally with end-to-end encryption for all cloud features.',
    tag: 'Security'
  },
  {
    icon: <BarChart2 size={28} />, title: 'Performance Analytics',
    desc: 'Detailed session reports show your average FPS, hotspots, and system bottlenecks. Understand your PC and fix what matters.',
    tag: 'Analytics'
  },
  {
    icon: <Settings size={28} />, title: 'Per-Game Profiles',
    desc: 'Create separate optimization profiles for each game. Competitive shooter? Max FPS. Open world RPG? Balanced quality. Switch instantly.',
    tag: 'Profiles'
  },
  {
    icon: <Lock size={28} />, title: 'Secure Vault',
    desc: 'Store game keys, 2FA backup codes, and account credentials in our encrypted vault. Access from any device, protected by your master password.',
    tag: 'Security'
  },
];

const stats = [
  { val: '50K+', label: 'Active Members' },
  { val: '+40%', label: 'Average FPS Gain' },
  { val: '99.9%', label: 'Platform Uptime' },
  { val: '500+', label: 'Supported Games' },
  { val: '< 1s', label: 'Launch Time' },
  { val: '24/7', label: 'Support Available' },
];

const FeaturesPage: React.FC = () => (
  <div className="page">
    <div className="page__hero">
      <div className="page__hero-glow" />
      <motion.div className="page__hero-content"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="badge badge--gold">Platform Features</div>
        <h1 className="display-xl">Built to <span className="gold-text">Win</span></h1>
        <p>Every feature designed with one goal: make you a better gamer.</p>
      </motion.div>
    </div>

    {/* Stats bar */}
    <div className="feat-page__stats-bar">
      {stats.map((s, i) => (
        <motion.div key={s.label} className="feat-page__stat"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
        >
          <div className="feat-page__stat-val">{s.val}</div>
          <div className="feat-page__stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Features grid */}
    <div className="page__container">
      <div className="feat-page__grid">
        {mainFeatures.map((f, i) => (
          <motion.div key={f.title} className="feat-page__card"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
          >
            <div className="feat-page__card-top">
              <div className="feat-page__card-icon">{f.icon}</div>
              <span className="feat-page__card-tag">{f.tag}</span>
            </div>
            <h3 className="feat-page__card-title">{f.title}</h3>
            <p className="feat-page__card-desc">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="page__container">
      <motion.div className="feat-page__cta-box"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <div className="feat-page__cta-glow" />
        <Users size={32} color="var(--gold)" />
        <h2 className="display-lg">Ready to join the <span className="gold-text">Empire?</span></h2>
        <p>Start free — upgrade whenever you're ready.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/pricing" className="btn btn--gold">See Pricing <Zap size={14} /></a>
          <a href="/products" className="btn btn--outline">Browse Products</a>
        </div>
      </motion.div>
    </div>
  </div>
);

export default FeaturesPage;
