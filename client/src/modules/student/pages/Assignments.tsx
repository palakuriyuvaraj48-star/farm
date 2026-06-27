import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

export const Assignments: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Typography variant="h3">Assignments & Deadlines</Typography>
          <Typography style={{ color: 'var(--color-text-light)' }}>Fall 2026 Semester</Typography>
        </div>
        <ActionButton variant="primary">+ New Custom Task</ActionButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* To Do */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent)' }}></div>
            <Typography variant="h4">To Do (2)</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card style={{ borderTop: '4px solid var(--color-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>CS402</span>
                <span style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 600 }}>Due Today</span>
              </div>
              <Typography style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Dynamic Programming Problem Set</Typography>
              <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>Complete problems 4-10 in Chapter 6.</Typography>
              <ActionButton variant="outline" size="sm" style={{ width: '100%' }}>Submit Work</ActionButton>
            </Card>
            <Card style={{ borderTop: '4px solid var(--color-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secondary)' }}>ENG201</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Due in 3 days</span>
              </div>
              <Typography style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Ethics Essay</Typography>
              <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>Draft 1500 words on AI ethics.</Typography>
              <ActionButton variant="outline" size="sm" style={{ width: '100%' }}>Submit Work</ActionButton>
            </Card>
          </div>
        </div>

        {/* In Progress */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EAB308' }}></div>
            <Typography variant="h4">In Progress (1)</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card style={{ borderTop: '4px solid #EAB308' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>CS405</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Due Next Week</span>
              </div>
              <Typography style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Final Project Proposal</Typography>
              <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>Group of 3. Need to finalize the tech stack.</Typography>
              <ActionButton variant="outline" size="sm" style={{ width: '100%' }}>Continue Editing</ActionButton>
            </Card>
          </div>
        </div>

        {/* Completed */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-secondary)' }}></div>
            <Typography variant="h4">Completed (12)</Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
            <Card style={{ borderTop: '4px solid var(--color-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>CS402</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>Graded: 95/100</span>
              </div>
              <Typography style={{ fontWeight: 600, textDecoration: 'line-through' }}>Midterm 1 Review</Typography>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};
