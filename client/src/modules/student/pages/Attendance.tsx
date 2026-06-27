import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const Attendance: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Attendance Insights</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>Fall 2026 Semester</Typography>
        </div>
        <ActionButton variant="outline">Download Report</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card style={{ textAlign: 'center', borderTop: '4px solid var(--color-secondary)' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Overall Attendance</Typography>
          <Typography variant="h1" style={{ color: 'var(--color-secondary)', margin: '0.5rem 0' }}>92%</Typography>
          <Typography style={{ fontSize: '0.85rem' }}>Good standing</Typography>
        </Card>
        
        <Card style={{ textAlign: 'center', borderTop: '4px solid #EAB308' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>CS405 (Warning)</Typography>
          <Typography variant="h1" style={{ color: '#EAB308', margin: '0.5rem 0' }}>78%</Typography>
          <Typography style={{ fontSize: '0.85rem', color: '#EAB308' }}>Approaching 75% limit</Typography>
        </Card>

        <Card style={{ textAlign: 'center', borderTop: '4px solid var(--color-accent)' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Classes Missed</Typography>
          <Typography variant="h1" style={{ color: 'var(--color-accent)', margin: '0.5rem 0' }}>4</Typography>
          <Typography style={{ fontSize: '0.85rem' }}>This semester</Typography>
        </Card>
      </div>

      <Card>
        <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>Recent Classes</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { date: 'Oct 24, 2026', class: 'CS402: Advanced Algorithms', status: 'Present', color: 'var(--color-secondary)' },
            { date: 'Oct 23, 2026', class: 'ENG201: Engineering Ethics', status: 'Present', color: 'var(--color-secondary)' },
            { date: 'Oct 22, 2026', class: 'CS405: Software Engineering', status: 'Absent', color: '#EF4444' },
            { date: 'Oct 20, 2026', class: 'CS402: Advanced Algorithms', status: 'Present', color: 'var(--color-secondary)' },
          ].map((record, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: i === 3 ? 'none' : '1px solid var(--color-neutral-border)' }}>
              <div>
                <Typography style={{ fontWeight: 600 }}>{record.class}</Typography>
                <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{record.date}</Typography>
              </div>
              <div style={{ padding: '0.5rem 1rem', background: `${record.color}20`, color: record.color, borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.85rem' }}>
                {record.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
