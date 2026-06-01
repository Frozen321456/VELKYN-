import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const GlassCard: React.FC<{ id: string; title: string; content: string }> = ({ id, title, content }) => {
  const hoveredAssetId = useStore((state) => state.hoveredAssetId);
  const isVisible = hoveredAssetId === id;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '300px',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            fontFamily: 'sans-serif',
          }}
        >
          <h3 style={{ color: '#00ffff', margin: '0 0 1rem 0' }}>{title}</h3>
          <p style={{ lineHeight: '1.6', fontSize: '0.9rem', opacity: 0.8 }}>{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Overlay: React.FC = () => {
  const activeSection = useStore((state) => state.activeSection);

  const sections = [
    { title: 'Bridging Borders, Moving Businesses.', subtitle: 'China to Bangladesh, Redefined.' },
    { title: 'The Journey', subtitle: 'Seamless logistics from source to door.' },
    { title: 'The Anatomy of Trust', subtitle: 'Precision, Safety, and Mastery.' },
    { title: 'The Knowledge Hub', subtitle: 'Intelligence driving global trade.' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10, color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ position: 'absolute', left: '5%', top: '10%', maxWidth: '500px', pointerEvents: 'auto' }}>
        <motion.h1
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}
        >
          {sections[activeSection].title}
        </motion.h1>
        <motion.p
          key={`sub-${activeSection}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '1.2rem', opacity: 0.7, marginTop: '1rem' }}
        >
          {sections[activeSection].subtitle}
        </motion.p>
      </div>

      <GlassCard id="gps" title="Real-time Tracking" content="Monitor your cargo with precision GPS tracking from the moment it leaves the warehouse until it hits your door." />
      <GlassCard id="hull" title="Safety & Insurance" content="Our reinforced logistics chain ensures your goods are protected with world-class insurance and secure handling." />
      <GlassCard id="key" title="Customs Mastery" content="Skip the bureaucracy. Our experts handle all China-BD customs clearances with 100% compliance." />
    </div>
  );
};
