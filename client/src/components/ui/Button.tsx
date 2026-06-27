import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseClass = 'btn flex items-center justify-center gap-2 relative transition-all active:scale-[0.98]';
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'border-2 border-gray-200 hover:bg-gray-50 text-gray-800' : 'btn-secondary';
  const sizeClass = size === 'sm' ? 'py-1 px-3 text-sm' : size === 'lg' ? 'py-3 px-6 text-lg' : 'py-2 px-4';
  
  const isDisabled = disabled || isLoading;

  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass} ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`} 
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" size={16} />}
      {children}
    </button>
  );
};
