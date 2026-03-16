/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Lock, Monitor, Cpu } from 'lucide-react';
import './Pages.scss';

const stats = [
  { val: '50K+', label: 'Active Members' },
  { val: '100%', label: 'Undetected' },
  { val: '99.9%', label: 'Platform Uptime' },
  { val: '5', label: 'Premium Features' },
  { val: '< 1s', label: 'Launch Time' },
  { val: '24/7', label: 'Support Available' },
];

const mainFeatures = [
  { icon: <Zap size={28} />, tag: 'Performance', title: 'Ultra-Fast Launcher', desc: 'Launch any game in under a second. Emperor pre-loads your favorite titles and optimizes system resources automatically before you even click play.' },
  { icon: <Cpu size={28} />, tag: 'Intern', title: 'AIMBOT', desc: 'Our aimbot is special made. It will make you win every game without missing any shot. You can switch the smoothness to be less detected.' },
  { icon: <Shield size={28} />, tag: 'External', title: 'ESP', desc: "This option will enable you to see your opponent through walls. A big advantage if you don't want to get surprised. Be a good liar, and you will be undetected." },
  { icon: <Lock size={28} />, tag: 'AC', title: 'Bypass', desc: 'Our brand new bypass will allow you to play without Vanguard anti-cheat. Tired of getting banned? This is THE solution.' },
  { icon: <Monitor size={28} />, tag: 'HUD', title: 'In-Game Overlay', desc: 'A sleek, non-intrusive overlay shows FPS and ping. Our GUI is made by professionals to make it easy to use — even a beginner will master it instantly.' },
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

    {/* Stats */}
    <div className="features-page__stats">
      {stats.map((s, i) => (
        <motion.div key={s.label} className="features-page__stat"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.06 }}
        >
          <div className="features-page__stat-val">{s.val}</div>
          <div className="features-page__stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Features grid */}
    <div className="page__container">
      <div className="features-page__grid">
        {mainFeatures.map((f, i) => (
          <motion.div key={f.title} className="features-page__card"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="features-page__card-tag">{f.tag}</div>
            <div className="features-page__card-icon">{f.icon}</div>
            <h3 className="features-page__card-title">{f.title}</h3>
            <p className="features-page__card-desc">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default FeaturesPage;
