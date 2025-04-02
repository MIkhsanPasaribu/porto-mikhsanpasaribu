'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes based on theme
  const variantClasses = {
    primary: isDarkMode 
      ? 'bg-[#19A7CE] text-[#F6F1F1] hover:bg-[#146C94] focus:ring-[#146C94]' 
      : 'bg-[#0B409C] text-[#F2F7FF] hover:bg-[#10316B] focus:ring-[#0B409C]',
    secondary: isDarkMode 
      ? 'bg-[#146C94] text-[#F6F1F1] hover:bg-[#19A7CE] focus:ring-[#19A7CE]' 
      : 'bg-[#FDBE34] text-[#10316B] hover:bg-[#F0B01F] focus:ring-[#FDBE34]',
    outline: isDarkMode 
      ? 'bg-transparent border border-[#19A7CE] text-[#19A7CE] hover:bg-[#146C94]/10 focus:ring-[#19A7CE]' 
      : 'bg-transparent border border-[#0B409C] text-[#0B409C] hover:bg-[#FDBE34]/10 focus:ring-[#0B409C]',
    ghost: isDarkMode 
      ? 'bg-transparent text-[#F6F1F1] hover:bg-[#146C94]/20 focus:ring-[#146C94]' 
      : 'bg-transparent text-[#10316B] hover:bg-[#FDBE34]/20 focus:ring-[#0B409C]',
  };
  
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={`mr-2 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`ml-2 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {icon}
        </span>
      )}
    </button>
  );
}