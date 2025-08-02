import React, { useMemo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  const inputClass = useMemo(() => `input ${error ? 'error' : ''} ${className}`, [error, className]);
  
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClass}
        {...props}
      />
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
    </div>
  );
}; 