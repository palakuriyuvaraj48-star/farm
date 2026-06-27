import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';
import imgCampusLife from '@/assets/placeholders/campus_life.png';

export const StudentLife: React.FC = () => {
  return (
    <section className="section">
      <div className="container" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <Typography variant="h2">A Life Beyond the Classroom</Typography>
          <Typography style={{ marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>
            Join 300+ student clubs, compete in D1 athletics, and immerse yourself in a vibrant campus culture that fosters leadership and lifelong friendships.
          </Typography>
          <ActionButton>Explore Campus Life</ActionButton>
        </div>
        <div style={{ flex: '1 1 400px', height: '400px', background: `url(${imgCampusLife}) center/cover`, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}></div>
      </div>
    </section>
  );
};

export const AlumniImpact: React.FC = () => {
  return (
    <section className="section bg-neutral-light">
      <div className="container">
        <div className="section-header">
          <Typography variant="h2">Alumni Impact</Typography>
          <Typography>Our network of 250,000+ alumni are shaping the future across industries globally.</Typography>
        </div>
        <div className="card-grid">
          {/* Timeline conceptual items */}
          <Card>
            <Typography variant="h4">Sarah Jenkins '18</Typography>
            <Typography variant="research" style={{ color: 'var(--color-primary)' }}>Founder, EcoTech</Typography>
            <Typography style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Recently raised $50M Series B for sustainable energy storage solutions.</Typography>
          </Card>
          <Card>
            <Typography variant="h4">Dr. Marcus Webb '12</Typography>
            <Typography variant="research" style={{ color: 'var(--color-primary)' }}>Lead Researcher, WHO</Typography>
            <Typography style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Pioneered the new protocol for rapid response in epidemiological events.</Typography>
          </Card>
        </div>
      </div>
    </section>
  );
};

export const GlobalPartnerships: React.FC = () => {
  return (
    <section className="section" style={{ background: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
      <div className="container">
        <Typography variant="h2" style={{ color: 'white' }}>Global Network</Typography>
        <Typography style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Partnered with 150+ top universities and research institutes worldwide for exchange and collaborative innovation.
        </Typography>
        {/* Placeholder for interactive map */}
        <div style={{ width: '100%', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: 'rgba(255,255,255,0.5)' }}>Interactive World Map Visualization</Typography>
        </div>
      </div>
    </section>
  );
};
