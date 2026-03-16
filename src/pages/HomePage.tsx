import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import BottomSections from '../components/BottomSections';
import { products } from '../data/products';

const Marquee: React.FC = () => (
  <div style={{
    padding: '48px 0', background: 'var(--surface)',
    borderTop: '1px solid rgba(232,168,0,0.08)',
    borderBottom: '1px solid rgba(232,168,0,0.08)',
    overflow: 'hidden', position: 'relative',
  }}>
    <motion.div
      style={{
        display: 'flex', gap: '48px', whiteSpace: 'nowrap',
        fontFamily: 'Bebas Neue, cursive',
        fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
        letterSpacing: '0.12em', color: 'rgba(255,255,255,0.05)',
      }}
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: '48px', alignItems: 'center' }}>
          <span>EMPEROR</span>
          <span style={{ color: 'rgba(232,168,0,0.3)', fontSize: '0.6em' }}>◆</span>
          <span>GAMING PLATFORM</span>
          <span style={{ color: 'rgba(232,168,0,0.3)', fontSize: '0.6em' }}>◆</span>
          <span>SINCE 2025</span>
          <span style={{ color: 'rgba(232,168,0,0.3)', fontSize: '0.6em' }}>◆</span>
          <span>50K MEMBERS</span>
          <span style={{ color: 'rgba(232,168,0,0.3)', fontSize: '0.6em' }}>◆</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const HomePage: React.FC = () => {
  const productRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hero onShopClick={() => productRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <Marquee />
      <div ref={productRef}>
        <ProductSection products={products} />
      </div>
      <BottomSections />
    </>
  );
};

export default HomePage;
