import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { AICopilot } from '@/components/shared/AICopilot';
import { LayoutDashboard, BookOpen, Calendar, Settings, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const StudentPortalLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItem = (path: string, icon: React.ReactNode, label: string) => {
    const isActive = location.pathname === path || location.pathname === `/student/${path.split('/').pop()}`;
    return (
      <Link 
        to={path} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: isActive ? 'var(--color-text)' : 'var(--color-text-light)', 
          padding: '0.5rem', 
          borderRadius: 'var(--radius-sm)', 
          background: isActive ? 'var(--color-neutral-light)' : 'transparent',
          textDecoration: 'none'
        }}
      >
        {icon} {label}
      </Link>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Sidebar - Notion style */}
      <aside style={{ width: '250px', borderRight: '1px solid var(--color-neutral-border)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h3" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Student Portal</Typography>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItem('/student', <LayoutDashboard size={18} />, 'Dashboard')}
          {navItem('/student/assignments', <BookOpen size={18} />, 'Assignments')}
          {navItem('/student/attendance', <Calendar size={18} />, 'Attendance')}
          {navItem('/student/fees', <CreditCard size={18} />, 'Fees')}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          {navItem('/student/settings', <Settings size={18} />, 'Settings')}
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <Typography variant="h2" style={{ marginBottom: '2rem' }}>Welcome back, Alex.</Typography>
        <Typography style={{ color: 'var(--color-text-light)' }}>Your AI study assistant is ready to help you plan your week.</Typography>
        {children}
      </main>
      
      <AICopilot />
    </div>
  );
};
