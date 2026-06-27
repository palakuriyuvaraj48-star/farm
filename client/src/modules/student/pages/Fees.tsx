import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const Fees: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Fee Tracking & Payments</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>Manage your university finances</Typography>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <Card style={{ background: 'var(--color-primary)', color: 'white' }}>
          <Typography style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Current Balance Due</Typography>
          <Typography variant="h1" style={{ color: 'white', margin: '0.5rem 0' }}>$4,250.00</Typography>
          <Typography style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Due by Nov 15, 2026</Typography>
          <ActionButton variant="primary" style={{ background: 'var(--color-accent)', width: '100%' }}>Pay Now</ActionButton>
        </Card>

        <Card>
          <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>Payment Methods</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-neutral-border)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '24px', background: 'var(--color-secondary)', borderRadius: '4px' }}></div>
                <div>
                  <Typography style={{ fontWeight: 600 }}>Visa ending in 4242</Typography>
                  <Typography style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Expires 12/28</Typography>
                </div>
              </div>
              <ActionButton variant="outline" size="sm">Edit</ActionButton>
            </div>
            <ActionButton variant="outline" style={{ borderStyle: 'dashed' }}>+ Add Payment Method</ActionButton>
          </div>
        </Card>
      </div>

      <Card>
        <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>Invoice History</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-neutral-border)' }}>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Invoice Date</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Description</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Amount</th>
              <th style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Oct 01, 2026', desc: 'Fall 2026 Tuition (Installment 2)', amt: '$4,250.00', status: 'Pending', color: '#EAB308' },
              { date: 'Sep 01, 2026', desc: 'Fall 2026 Tuition (Installment 1)', amt: '$4,250.00', status: 'Paid', color: 'var(--color-secondary)' },
              { date: 'Aug 15, 2026', desc: 'Library Fine', amt: '$15.00', status: 'Paid', color: 'var(--color-secondary)' },
            ].map((inv, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-neutral-border)' }}>
                <td style={{ padding: '1rem 0.5rem' }}>{inv.date}</td>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{inv.desc}</td>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{inv.amt}</td>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: `${inv.color}20`, color: inv.color, borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
