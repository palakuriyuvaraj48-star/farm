import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';

const topRecruiters = ['Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Tesla'];

export const Placements: React.FC = () => {
  return (
    <section className="section bg-neutral-light">
      <div className="container">
        <div className="section-header">
          <Typography variant="h2">Global Placements</Typography>
          <Typography>Our graduates go on to lead the world's most innovative companies.</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <Card className="text-center">
            <Typography variant="h3" style={{ color: 'var(--color-primary)' }}>$180K</Typography>
            <Typography>Highest Package</Typography>
          </Card>
          <Card className="text-center">
            <Typography variant="h3" style={{ color: 'var(--color-primary)' }}>$110K</Typography>
            <Typography>Average Package</Typography>
          </Card>
          <Card className="text-center">
            <Typography variant="h3" style={{ color: 'var(--color-primary)' }}>95%</Typography>
            <Typography>Fortune 500 Placement</Typography>
          </Card>
        </div>

        <Typography variant="h4" className="text-center" style={{ marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>Top Recruiters</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {topRecruiters.map((company, idx) => (
            <div key={idx} style={{ padding: '1rem 2rem', background: 'var(--color-bg)', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
