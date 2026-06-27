import React from 'react';
import { HeroSection } from './home/HeroSection';
import { UniversityStats } from './home/UniversityStats';
import { ResearchExcellence } from './home/ResearchExcellence';
import { Departments } from './home/Departments';
import { Placements } from './home/Placements';
import { StudentLife, AlumniImpact, GlobalPartnerships } from './home/OtherSections';
import { NewsAndEvents } from './home/NewsAndEvents';
import { Navbar } from '@/components/layout/Navbar';
import { MegaFooter } from '@/components/layout/MegaFooter';
import { AICopilot } from '@/components/shared/AICopilot';

export const Home: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '80px' }}> {/* Padding for fixed navbar */}
        <HeroSection />
        <UniversityStats />
        <ResearchExcellence />
        <Departments />
        <Placements />
        <StudentLife />
        <AlumniImpact />
        <NewsAndEvents />
        <GlobalPartnerships />
      </main>
      <MegaFooter />
      <AICopilot />
    </div>
  );
};
