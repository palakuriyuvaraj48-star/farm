import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const ResearchManagement: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Research Management</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>Dr. Alan Turing Lab</Typography>
        </div>
        <ActionButton variant="primary">+ New Publication</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card style={{ textAlign: 'center' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Grants</Typography>
          <Typography variant="h1" style={{ color: 'var(--color-primary)', margin: '0.5rem 0' }}>$1.2M</Typography>
          <Typography style={{ fontSize: '0.85rem' }}>Across 3 projects</Typography>
        </Card>
        
        <Card style={{ textAlign: 'center' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Publications (2026)</Typography>
          <Typography variant="h1" style={{ color: 'var(--color-secondary)', margin: '0.5rem 0' }}>8</Typography>
          <Typography style={{ fontSize: '0.85rem' }}>+2 pending review</Typography>
        </Card>

        <Card style={{ textAlign: 'center' }}>
          <Typography style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Citations</Typography>
          <Typography variant="h1" style={{ color: 'var(--color-accent)', margin: '0.5rem 0' }}>4,892</Typography>
          <Typography style={{ fontSize: '0.85rem' }}>h-index: 34</Typography>
        </Card>
      </div>

      <Card>
        <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>Recent Publications</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { title: 'Quantum Error Correction in Deep Neural Networks', journal: 'Nature AI', status: 'Published', date: 'Oct 2026' },
            { title: 'Algorithmic Bias in Admissions Sorting', journal: 'Journal of Academic Tech', status: 'Under Review', date: 'Pending' },
            { title: 'Optimizing O(n) Database Queries', journal: 'IEEE CS', status: 'Draft', date: 'N/A' },
          ].map((pub, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: i === 2 ? 'none' : '1px solid var(--color-neutral-border)' }}>
              <div style={{ maxWidth: '70%' }}>
                <Typography style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pub.title}</Typography>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                  <span>{pub.journal}</span>
                  <span>&bull;</span>
                  <span>{pub.date}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: pub.status === 'Published' ? 'var(--color-secondary)' : 'var(--color-text-light)' }}>
                  {pub.status}
                </span>
                <ActionButton variant="outline" size="sm">Edit</ActionButton>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
