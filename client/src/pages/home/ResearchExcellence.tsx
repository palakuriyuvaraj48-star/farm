import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Microscope, Cpu, Globe, HeartPulse } from 'lucide-react';

const researchAreas = [
  { icon: <Microscope size={32} color="var(--color-primary)" />, title: 'Quantum Computing Lab', desc: 'Pioneering next-generation quantum algorithms and hardware.' },
  { icon: <HeartPulse size={32} color="var(--color-primary)" />, title: 'Bio-Engineering Institute', desc: 'Developing synthetic biology solutions for global health.' },
  { icon: <Cpu size={32} color="var(--color-primary)" />, title: 'AI & Robotics Center', desc: 'Advancing AGI research and autonomous robotic systems.' },
  { icon: <Globe size={32} color="var(--color-primary)" />, title: 'Climate Tech Initiative', desc: 'Sustainable technologies for carbon-neutral futures.' }
];

export const ResearchExcellence: React.FC = () => {
  return (
    <section className="section bg-neutral-light">
      <div className="container">
        <div className="section-header">
          <Typography variant="h2">Research Excellence</Typography>
          <Typography>Driven by curiosity. Powered by innovation. Discover our state-of-the-art research centers pushing the boundaries of human knowledge.</Typography>
        </div>
        
        <div className="card-grid">
          {researchAreas.map((area, index) => (
            <Card key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--color-neutral-light)', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
                {area.icon}
              </div>
              <Typography variant="h4">{area.title}</Typography>
              <Typography variant="research" style={{ color: 'var(--color-text-light)' }}>{area.desc}</Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
