import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import imgCS from '@/assets/images/dept_cs.png';
import imgBusiness from '@/assets/images/dept_business.png';
import imgEngineering from '@/assets/images/dept_engineering.png';
import imgDesign from '@/assets/placeholders/placements.png';
import { ActionButton } from '@/components/shared/ActionButton';

const departments = [
  { name: 'School of Computer Science', img: imgCS },
  { name: 'School of Business', img: imgBusiness },
  { name: 'School of Engineering', img: imgEngineering },
  { name: 'School of Design', img: imgDesign }
];

export const Departments: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <Typography variant="h2">Schools & Departments</Typography>
          <Typography>Explore our diverse academic offerings led by world-renowned faculty.</Typography>
        </div>
        
        <div className="card-grid">
          {departments.map((dept, idx) => (
            <Card key={idx} style={{ padding: 0 }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={dept.img} alt={dept.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <Typography variant="h4">{dept.name}</Typography>
                <ActionButton variant="outline" style={{ marginTop: '1rem', width: '100%' }}>Explore Programs</ActionButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
