import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../config/content';
import './Loader.scss';

interface LoaderProps { onComplete: () => void; }

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [statusText, setStatusText] = useState('INITIALIZING...');

  useEffect(() => {
    const steps = SITE_CONFIG.loader.steps;
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) { setProgress(steps[i].pct); setStatusText(steps[i].text); i++; }
      else { clearInterval(iv); setTimeout(() => setPhase('reveal'), 400); setTimeout(() => { setPhase('done'); onComplete(); }, 1800); }
    }, 220);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div className="emp-loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <motion.div className="emp-loader__scan" animate={{ top: ['0%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} />
          {['tl','tr','bl','br'].map(c => <div key={c} className={`emp-loader__corner emp-loader__corner--${c}`} />)}
          <div className="emp-loader__grid" />
          <div className="emp-loader__center">
            <motion.div className="emp-loader__logo" initial={{ opacity: 0, scale: 0.7, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.34,1.56,0.64,1] }}>
              <img src="/emperor/avatar.gif" alt="Emperor" className="emp-loader__avatar" />
            </motion.div>
            <motion.div className="emp-loader__brand" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <img src="/emperor/welcome.png" alt="Welcome" className="emp-loader__welcome-img" />
            </motion.div>
            <div className="emp-loader__progress-wrap">
              <div className="emp-loader__bar">
                <motion.div className="emp-loader__bar-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                <motion.div className="emp-loader__bar-glow" animate={{ left: `${progress}%` }} transition={{ duration: 0.35, ease: 'easeOut' }} />
              </div>
              <div className="emp-loader__labels">
                <span className="emp-loader__status">{statusText}</span>
                <span className="emp-loader__pct">{String(progress).padStart(3,'0')}%</span>
              </div>
            </div>
            <div className="emp-loader__nodes">
              {[20,40,60,80,100].map((t, i) => (
                <React.Fragment key={i}>
                  <div className={`emp-loader__node ${progress >= t ? 'active' : ''}`} />
                  {i < 4 && <div className={`emp-loader__connector ${progress >= t ? 'active' : ''}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {phase === 'reveal' && (
              <>
                <motion.div className="emp-loader__wipe emp-loader__wipe--top" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.65, ease: [0.76,0,0.24,1] }} />
                <motion.div className="emp-loader__wipe emp-loader__wipe--bottom" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.65, ease: [0.76,0,0.24,1], delay: 0.06 }} />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loader;
