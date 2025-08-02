import React, { useMemo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const buttonClass = useMemo(() => `btn btn-${variant} btn-${size} ${className}`, [variant, size, className]);
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}; 