import React from 'react';
import { ActionButton } from '@/components/shared/ActionButton';
import { Typography } from '@/components/ui/Typography';
// We assume hero-bg.png is inside assets/images
import heroBg from '@/assets/images/hero-bg.png';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <img src={heroBg} alt="EduSphere Pro Campus" className="hero-bg" />
      <div className="hero-overlay"></div>
      <div className="hero-content animate-fade-in-up">
        <Typography variant="display" style={{ color: '#fff' }} className="hero-title">
          Empowering the Future of Global Innovation
        </Typography>
        <Typography variant="h3" style={{ color: '#fff', fontWeight: 400 }} className="hero-subtitle">
          Join a world-class academic ecosystem designed for the leaders, researchers, and creators of tomorrow.
        </Typography>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <ActionButton variant="primary" size="lg" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Apply Now
          </ActionButton>
          <ActionButton variant="outline" size="lg" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
            Virtual Tour
          </ActionButton>
        </div>
      </div>
    </section>
  );
};
