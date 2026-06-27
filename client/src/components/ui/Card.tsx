import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = false, ...props }) => {
  return (
    <div className={`card ${glass ? 'glass-panel' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};
