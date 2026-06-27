import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

import imgAdmissions from '@/assets/images/admissions_bg.png';
import imgCampus from '@/assets/placeholders/campus.png';
import imgCampusLife from '@/assets/placeholders/campus_life.png';

export const Admissions: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Typography variant="h3">Admissions Pipeline 2026</Typography>
        <ActionButton variant="primary">Export Report</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
          <img src={imgAdmissions} alt="Students" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Applications</Typography>
            <Typography variant="h2" style={{ color: 'var(--color-primary)' }}>124,500</Typography>
            <div style={{ width: '100%', height: '8px', background: 'var(--color-neutral-border)', borderRadius: '4px', marginTop: '1rem' }}>
              <div style={{ width: '75%', height: '100%', background: 'var(--color-secondary)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </Card>

        <Card style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
          <img src={imgCampus} alt="Acceptance" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Acceptance Rate</Typography>
            <Typography variant="h2" style={{ color: 'var(--color-accent)' }}>8.4%</Typography>
            <div style={{ width: '100%', height: '8px', background: 'var(--color-neutral-border)', borderRadius: '4px', marginTop: '1rem' }}>
              <div style={{ width: '8.4%', height: '100%', background: 'var(--color-accent)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </Card>

        <Card style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
          <img src={imgCampusLife} alt="Global" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>International Students</Typography>
            <Typography variant="h2" style={{ color: '#EAB308' }}>22%</Typography>
            <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', marginTop: '0.5rem' }}>From 142 different countries</Typography>
          </div>
        </Card>
      </div>

      <Card>
        <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>Recent Applications Review Queue</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-neutral-border)' }}>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Applicant ID</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Program</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Status</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'APP-2026-901', prog: 'B.S. Computer Science', status: 'Pending Review', color: '#EAB308' },
              { id: 'APP-2026-902', prog: 'MBA Business Admin', status: 'Interview Scheduled', color: 'var(--color-secondary)' },
              { id: 'APP-2026-903', prog: 'Ph.D. Bio-Engineering', status: 'Accepted', color: 'var(--color-accent)' },
            ].map((app, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-border)' }}>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{app.id}</td>
                <td style={{ padding: '1rem 0.5rem' }}>{app.prog}</td>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <span style={{ background: `${app.color}20`, color: app.color, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>{app.status}</span>
                </td>
                <td style={{ padding: '1rem 0.5rem' }}><ActionButton variant="outline" size="sm">Review</ActionButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
