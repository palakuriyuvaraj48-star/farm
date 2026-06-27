import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { AICopilot } from '@/components/shared/AICopilot';
import { BarChart3, Users, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminERPLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-light)' }}>
      {/* Top Navbar - Stripe style */}
      <header style={{ background: '#fff', borderBottom: '1px solid var(--color-neutral-border)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Typography variant="h4" style={{ margin: 0, color: 'var(--color-primary)' }}>EduSphere ERP</Typography>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>Financials</Link>
            <Link to="/admin/admissions" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Admissions</Link>
            <Link to="/admin/departments" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Departments</Link>
          </nav>
        </div>
        <div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>AD</div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Typography variant="h2" style={{ margin: 0 }}>University Analytics</Typography>
          <div style={{ background: '#fff', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Last 30 Days
          </div>
        </div>
        
        {/* Metric Cards - Stripe Style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Revenue', value: '$45.2M', trend: '+12%', icon: <BarChart3 size={20} /> },
            { label: 'Active Students', value: '42,105', trend: '+3%', icon: <Users size={20} /> },
            { label: 'Placement Rate', value: '98.2%', trend: '+1.5%', icon: <Briefcase size={20} /> },
            { label: 'Research Grants', value: '$12.4M', trend: '+22%', icon: <GraduationCap size={20} /> },
          ].map((metric, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{metric.label}</span>
                {metric.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-title)' }}>{metric.value}</span>
                <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>
        
        {children}
      </main>
      <AICopilot />
    </div>
  );
};
