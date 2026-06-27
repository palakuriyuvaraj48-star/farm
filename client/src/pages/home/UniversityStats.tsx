import React from 'react';

const stats = [
  { label: 'Students', value: '45,000+' },
  { label: 'Faculty', value: '3,200+' },
  { label: 'Research Publications', value: '120k+' },
  { label: 'Placements', value: '98%' },
  { label: 'Global Collaborations', value: '150+' },
];

export const UniversityStats: React.FC = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
