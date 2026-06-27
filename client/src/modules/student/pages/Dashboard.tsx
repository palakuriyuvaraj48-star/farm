import React from 'react';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ActionButton } from '@/components/shared/ActionButton';

import imgDashboard from '@/assets/images/student_dashboard.png';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card style={{ background: `url(${imgDashboard}) center/cover`, color: 'white', padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,25,47,0.9), rgba(10,25,47,0.3))' }}></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Typography variant="h3" style={{ color: 'white' }}>Fall Semester 2026</Typography>
              <Typography style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '400px', margin: '0.5rem 0 1.5rem' }}>You have 3 assignments due this week and 1 upcoming midterm.</Typography>
              <ActionButton variant="primary" style={{ background: 'var(--color-accent)' }}>View Schedule</ActionButton>
            </div>
          </Card>

          <Typography variant="h4" style={{ marginTop: '1rem' }}>Today's Classes</Typography>
          {[
            { time: '09:00 AM', name: 'Advanced Algorithms', room: 'Hall 402', type: 'Lecture' },
            { time: '11:30 AM', name: 'Quantum Computing basics', room: 'Lab 12', type: 'Lab' },
            { time: '02:00 PM', name: 'Engineering Ethics', room: 'Hall 201', type: 'Seminar' },
          ].map((cls, i) => (
            <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-primary)', width: '80px' }}>{cls.time}</div>
                <div style={{ width: '4px', height: '40px', background: 'var(--color-secondary)', borderRadius: '4px' }}></div>
                <div>
                  <Typography style={{ fontWeight: 600 }}>{cls.name}</Typography>
                  <Typography style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{cls.room}</Typography>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--color-neutral-light)', borderRadius: 'var(--radius-full)' }}>{cls.type}</span>
            </Card>
          ))}
        </div>

        {/* Sidebar Mini */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>AI Study Assistant</Typography>
            <Typography style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>Based on your recent quiz scores, I recommend reviewing Chapter 4 of Algorithms.</Typography>
            <ActionButton variant="outline" style={{ width: '100%', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Generate Study Plan</ActionButton>
          </Card>
          
          <Card>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Quick Actions</Typography>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Download Transcript</a></li>
              <li><a href="#" style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pay Semester Fees</a></li>
              <li><a href="#" style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Book Library Room</a></li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
