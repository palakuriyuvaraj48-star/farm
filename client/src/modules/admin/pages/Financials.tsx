import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const Financials: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Typography variant="h3">Financial Overview</Typography>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ActionButton variant="outline">Q3 2026</ActionButton>
          <ActionButton variant="primary">Download Ledger</ActionButton>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white' }}>
          <Typography style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Total Endowment</Typography>
          <Typography variant="h1" style={{ color: 'white', marginTop: '0.5rem' }}>$4.2B</Typography>
          <Typography style={{ marginTop: '1rem', fontSize: '0.9rem' }}>+5.2% from last fiscal year</Typography>
        </Card>

        <Card>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>Revenue Breakdown</Typography>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--color-primary) 0% 45%, var(--color-accent) 45% 75%, var(--color-secondary) 75% 100%)' }}></div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-primary)' }}></span> Tuition (45%)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-accent)' }}></span> Research Grants (30%)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-secondary)' }}></span> Endowment Returns (25%)</li>
            </ul>
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Typography variant="h4">Department Budgets vs. Actual</Typography>
          <ActionButton variant="outline" size="sm">View All</ActionButton>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { dept: 'School of Computer Science', allocated: '$45M', spent: '$41M', percent: 91 },
            { dept: 'Bio-Engineering Institute', allocated: '$60M', spent: '$62M', percent: 103 },
            { dept: 'School of Business', allocated: '$30M', spent: '$25M', percent: 83 },
          ].map((dept, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>{dept.dept}</span>
                <span style={{ color: 'var(--color-text-light)' }}>{dept.spent} / {dept.allocated}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--color-neutral-border)', borderRadius: '4px' }}>
                <div style={{ width: `${dept.percent > 100 ? 100 : dept.percent}%`, height: '100%', background: dept.percent > 100 ? '#EF4444' : 'var(--color-accent)', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
