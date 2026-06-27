import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const GradeEntry: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <Typography variant="h3">Grade Entry: CS402</Typography>
          <Typography style={{ color: 'var(--color-text-light)', marginTop: '0.25rem' }}>Advanced Algorithms - Midterm 1</Typography>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ActionButton variant="outline">Save Draft</ActionButton>
          <ActionButton variant="primary">Publish Grades</ActionButton>
        </div>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--color-neutral-light)' }}>
            <tr>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Student ID</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Score (/100)</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'STU-2024-001', name: 'Alice Chen', score: '94' },
              { id: 'STU-2024-002', name: 'James Wilson', score: '88' },
              { id: 'STU-2024-003', name: 'Sarah Patel', score: '76' },
              { id: 'STU-2024-004', name: 'Marcus Johnson', score: '91' },
            ].map((stu, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{stu.id}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                      {stu.name.charAt(0)}
                    </div>
                    {stu.name}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <input type="text" defaultValue={stu.score} style={{ width: '60px', padding: '0.5rem', border: '1px solid var(--color-neutral-border)', borderRadius: '4px', textAlign: 'center', fontWeight: 600 }} />
                </td>
                <td style={{ padding: '1rem' }}>
                  <input type="text" placeholder="Add comment..." style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-neutral-border)', borderRadius: '4px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
        <Card style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-primary)', color: 'white', padding: '1rem', borderRadius: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Class Average</Typography>
            <Typography variant="h3">87.2</Typography>
          </div>
        </Card>
        
        <Card style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-accent)', color: 'white', padding: '1rem', borderRadius: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Highest Score</Typography>
            <Typography variant="h3">98.0</Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};
