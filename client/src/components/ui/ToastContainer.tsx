import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/store/useToast';
import { Toast } from './Toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            id={toast.id} 
            type={toast.type} 
            message={toast.message} 
            onClose={removeToast} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
