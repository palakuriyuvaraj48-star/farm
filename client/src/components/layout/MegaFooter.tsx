import React from 'react';
import { GraduationCap, Twitter, Linkedin, Github } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { Link } from 'react-router-dom';
import { useToast } from '@/store/useToast';

export const MegaFooter: React.FC = () => {
  const { addToast } = useToast();

  const handleWIP = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    addToast('info', `${name} is currently under development.`);
  };
  return (
    <footer className="mega-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <GraduationCap size={32} color="#fff" />
              <Typography variant="h3" style={{ color: '#fff', margin: 0 }}>EduSphere Pro</Typography>
            </div>
            <Typography style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              A world-class platform defining the future of academic excellence and research innovation.
            </Typography>
          </div>
          
          <div className="footer-col">
            <h4>Academics</h4>
            <ul className="footer-links">
              <li><a href="#undergrad" onClick={(e) => handleWIP(e, 'Undergraduate Programs')}>Undergraduate Programs</a></li>
              <li><a href="#grad" onClick={(e) => handleWIP(e, 'Graduate Programs')}>Graduate Programs</a></li>
              <li><a href="#executive" onClick={(e) => handleWIP(e, 'Executive Education')}>Executive Education</a></li>
              <li><a href="#online" onClick={(e) => handleWIP(e, 'Online Learning')}>Online Learning</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Research</h4>
            <ul className="footer-links">
              <li><a href="#centers" onClick={(e) => handleWIP(e, 'Research Centers')}>Research Centers</a></li>
              <li><a href="#publications" onClick={(e) => handleWIP(e, 'Publications')}>Publications</a></li>
              <li><a href="#innovation" onClick={(e) => handleWIP(e, 'Innovation Labs')}>Innovation Labs</a></li>
              <li><a href="#patents" onClick={(e) => handleWIP(e, 'Patents & IP')}>Patents & IP</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Portals</h4>
            <ul className="footer-links">
              <li><Link to="/student">Student Portal</Link></li>
              <li><Link to="/faculty">Faculty Portal</Link></li>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><a href="#alumni" onClick={(e) => handleWIP(e, 'Alumni Network')}>Alumni Network</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduSphere Pro University. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#twitter" onClick={(e) => handleWIP(e, 'Twitter')} style={{ color: 'rgba(255,255,255,0.7)' }}><Twitter size={20} /></a>
            <a href="#linkedin" onClick={(e) => handleWIP(e, 'LinkedIn')} style={{ color: 'rgba(255,255,255,0.7)' }}><Linkedin size={20} /></a>
            <a href="#github" onClick={(e) => handleWIP(e, 'GitHub')} style={{ color: 'rgba(255,255,255,0.7)' }}><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
