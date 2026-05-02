import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', fullWidth, className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-body font-semibold transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-primary text-on-primary rounded-2xl px-6 py-3 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]',
    secondary: 'bg-surface-container-high text-on-surface rounded-2xl px-6 py-3 shadow-soft hover:shadow-ambient hover:bg-surface-container-highest hover:scale-[1.02]',
    tertiary: 'text-primary hover:bg-surface-container-highest rounded-2xl px-4 py-2 hover:scale-[1.02]',
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
