import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';
import imgResearch from '@/assets/placeholders/research.png';
import imgCampus from '@/assets/placeholders/campus.png';
import imgAlumni from '@/assets/placeholders/campus_life.png';

const newsItems = [
  { category: 'Research', title: 'Breakthrough in Quantum Encryption announced by EduSphere Labs', date: 'Oct 24', img: imgResearch },
  { category: 'Campus', title: 'New Sustainable Design Hub opens in North Campus', date: 'Oct 21', img: imgCampus },
  { category: 'Alumni', title: 'Global Alumni Summit to be hosted in London this Spring', date: 'Oct 15', img: imgAlumni },
];

export const NewsAndEvents: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <Typography variant="h2" style={{ margin: 0 }}>News & Events</Typography>
            <Typography style={{ color: 'var(--color-text-light)', marginTop: '0.5rem' }}>The latest updates from our global community.</Typography>
          </div>
          <ActionButton variant="outline">View All News</ActionButton>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {newsItems.map((item, idx) => (
            <Card key={idx} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  <span>{item.category}</span>
                  <span style={{ color: 'var(--color-text-light)' }}>{item.date}</span>
                </div>
                <Typography variant="h4" style={{ marginBottom: '1rem' }}>{item.title}</Typography>
                <a href="#" style={{ marginTop: 'auto', fontWeight: 600, fontSize: '0.9rem' }}>Read full story &rarr;</a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
