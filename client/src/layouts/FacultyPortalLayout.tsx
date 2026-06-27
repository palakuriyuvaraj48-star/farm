import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { AICopilot } from '@/components/shared/AICopilot';
import { Users, FileText, BarChart, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const FacultyPortalLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItem = (path: string, icon: React.ReactNode, label: string) => {
    const isActive = location.pathname === path || location.pathname === `/faculty/${path.split('/').pop()}`;
    return (
      <Link 
        to={path} 
        style={{ 
          color: isActive ? 'var(--color-primary)' : 'var(--color-text-light)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '0.25rem', 
          fontSize: '0.75rem',
          textDecoration: 'none'
        }}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F3F4F6' }}>
      {/* Top Navbar - MS 365 / Canvas style */}
      <header style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" style={{ margin: 0, color: '#fff' }}>EduSphere Faculty</Typography>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem' }}>Prof. J. Smith</span>
          <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)' }}></div>
        </div>
      </header>
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Mini */}
        <aside style={{ width: '80px', background: '#fff', borderRight: '1px solid var(--color-neutral-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', gap: '1.5rem' }}>
          {navItem('/faculty', <LayoutDashboard size={24} />, 'Dashboard')}
          {navItem('/faculty/attendance', <Users size={24} />, 'Attendance')}
          {navItem('/faculty/analytics', <BarChart size={24} />, 'Analytics')}
          {navItem('/faculty/research', <FileText size={24} />, 'Research')}
        </aside>
        
        {/* Main Content Workspace */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)', minHeight: '80vh' }}>
            <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>Faculty Dashboard</Typography>
            <Typography style={{ color: 'var(--color-text-light)' }}>Manage your courses, view student analytics, and track your research publications here.</Typography>
            {children}
          </div>
        </main>
      </div>
      
      <AICopilot />
    </div>
  );
};
