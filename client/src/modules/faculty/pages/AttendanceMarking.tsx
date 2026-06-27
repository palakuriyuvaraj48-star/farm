import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const AttendanceMarking: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Attendance Roster</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>CS402 - Oct 24, 2026</Typography>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ActionButton variant="outline">Mark All Present</ActionButton>
          <ActionButton variant="primary">Submit Roster</ActionButton>
        </div>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--color-neutral-light)' }}>
            <tr>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Student ID</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'STU-2024-001', name: 'Alice Chen', status: 'Present', color: 'var(--color-secondary)' },
              { id: 'STU-2024-002', name: 'James Wilson', status: 'Absent', color: '#EF4444' },
              { id: 'STU-2024-003', name: 'Sarah Patel', status: 'Present', color: 'var(--color-secondary)' },
              { id: 'STU-2024-004', name: 'Marcus Johnson', status: 'Late', color: '#EAB308' },
            ].map((stu, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{stu.id}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                      {stu.name.charAt(0)}
                    </div>
                    {stu.name}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: `${stu.color}20`, color: stu.color, borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {stu.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ActionButton variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem' }}>P</ActionButton>
                    <ActionButton variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem' }}>A</ActionButton>
                    <ActionButton variant="outline" size="sm" style={{ padding: '0.25rem 0.5rem' }}>L</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
