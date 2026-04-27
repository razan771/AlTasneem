import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', fullWidth, className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-body font-semibold transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-primary text-on-primary rounded-full px-6 py-3 hover:shadow-lg',
    secondary: 'bg-secondary-container text-on-secondary-container rounded-full px-6 py-3 hover:bg-secondary-container/80',
    tertiary: 'text-primary hover:bg-surface-container-highest rounded-full px-4 py-2',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
