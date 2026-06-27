import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

import imgCS from '@/assets/images/dept_cs.png';
import imgBusiness from '@/assets/images/dept_business.png';
import imgEngineering from '@/assets/images/dept_engineering.png';

export const DepartmentsPerformance: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Typography variant="h3">Department Performance</Typography>
        <ActionButton variant="outline">Export CSV</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { name: 'Computer Science', students: 4500, faculty: 120, rating: 4.8, img: imgCS },
          { name: 'Business Administration', students: 3200, faculty: 95, rating: 4.6, img: imgBusiness },
          { name: 'Bio-Engineering', students: 1800, faculty: 85, rating: 4.9, img: imgEngineering },
        ].map((dept, i) => (
          <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
            <img src={dept.img} alt={dept.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>{dept.name}</Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span>Students</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{dept.students}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span>Faculty</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{dept.faculty}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                <span>Avg. Rating</span>
                <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{dept.rating} / 5.0</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
