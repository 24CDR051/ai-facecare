import React from 'react';
import { useSkinCare } from '../context/SkinCareContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useSkinCare();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon text-sage" />,
    error: <AlertCircle size={18} className="toast-icon text-danger" />,
    info: <Info size={18} className="toast-icon text-lavender" />
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast toast-${toast.type} animate-fade-in`}>
        {icons[toast.type] || icons.info}
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
};
