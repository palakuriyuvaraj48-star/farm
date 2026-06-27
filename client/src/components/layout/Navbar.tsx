import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/store/useToast';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSignIn = () => {
    navigate('/student');
    addToast('success', 'Successfully signed in as Alex (Demo).');
  };

  const handleApply = () => {
    addToast('info', 'Redirecting to application portal...');
    setTimeout(() => {
      navigate('/admin/admissions');
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
          <GraduationCap size={32} color="var(--color-primary)" />
          <span>EduSphere Pro</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/student" className="navbar-link">Student Portal</Link>
          <Link to="/faculty" className="navbar-link">Faculty Portal</Link>
          <Link to="/admin" className="navbar-link">Admin ERP</Link>
          <Button variant="ghost" onClick={handleSignIn}>Sign In</Button>
          <Button variant="primary" onClick={handleApply}>Apply Now</Button>
        </div>
      </div>
    </nav>
  );
};
