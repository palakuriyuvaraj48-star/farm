import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'research';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  as,
  ...props
}) => {
  let Component: React.ElementType = as || 'p';
  let variantClass = '';

  switch (variant) {
    case 'display':
      Component = as || 'h1';
      variantClass = 'display-heading';
      break;
    case 'h1':
      Component = as || 'h1';
      break;
    case 'h2':
      Component = as || 'h2';
      break;
    case 'h3':
      Component = as || 'h3';
      break;
    case 'h4':
      Component = as || 'h4';
      break;
    case 'research':
      Component = as || 'p';
      variantClass = 'research-text';
      break;
    default:
      break;
  }

  return (
    <Component className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};
