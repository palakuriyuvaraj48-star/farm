import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const StudentAnalytics: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Student Risk Analytics</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>Identify students needing early intervention</Typography>
        </div>
        <ActionButton variant="outline">Download Report</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-neutral-light)' }}>
          <Typography variant="h4">Filters</Typography>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)' }}>Course</label>
            <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-neutral-border)', marginTop: '0.25rem' }}>
              <option>All Courses</option>
              <option>CS402: Advanced Algorithms</option>
              <option>CS405: Software Engineering</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)' }}>Risk Level</label>
            <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-neutral-border)', marginTop: '0.25rem' }}>
              <option>High Risk Only</option>
              <option>Medium & High</option>
              <option>All Students</option>
            </select>
          </div>
          <ActionButton variant="primary" style={{ marginTop: 'auto' }}>Apply Filters</ActionButton>
        </Card>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-neutral-border)' }}>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Student</th>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Course</th>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Attendance</th>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Current Grade</th>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Risk Factor</th>
                <th style={{ padding: '1rem', color: 'var(--color-text-light)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'James Wilson', course: 'CS402', att: '65%', grade: 'D+', risk: 'High', color: '#EF4444' },
                { name: 'Sarah Patel', course: 'CS405', att: '80%', grade: 'C-', risk: 'Medium', color: '#EAB308' },
                { name: 'Marcus Johnson', course: 'CS402', att: '72%', grade: 'C+', risk: 'Medium', color: '#EAB308' },
              ].map((stu, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{stu.name}</td>
                  <td style={{ padding: '1rem' }}>{stu.course}</td>
                  <td style={{ padding: '1rem', color: parseInt(stu.att) < 75 ? '#EF4444' : 'inherit' }}>{stu.att}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{stu.grade}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: `${stu.color}20`, color: stu.color, padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{stu.risk}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <ActionButton variant="outline" size="sm">Message</ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
