import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/store/useToast';

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  actionMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  shouldFail?: boolean;
  delayMs?: number;
  onSuccess?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  children, 
  actionMessage,
  successMessage = 'Action completed successfully.', 
  errorMessage = 'An error occurred during the action.',
  shouldFail = false,
  delayMs = 1200,
  onClick,
  onSuccess,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.type !== 'submit') {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (onClick) {
      onClick(e);
    }

    if (props.type === 'submit') {
      // For forms, loading state will be handled by the form's onSubmit, not here.
      // We just pass the click through.
      return;
    }

    if (actionMessage) {
      addToast('info', actionMessage);
    }

    setIsLoading(true);
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) reject(new Error('Mock failure'));
          else resolve(true);
        }, delayMs);
      });
      
      addToast('success', successMessage);
      if (onSuccess) onSuccess();
    } catch (err) {
      addToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      {...props} 
      isLoading={isLoading} 
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
