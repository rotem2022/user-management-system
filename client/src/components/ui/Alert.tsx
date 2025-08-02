import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  className = ''
}) => {
  const alertClass = `alert alert-${type} ${className}`;
  
  return (
    <div className={alertClass}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-secondary"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}; 