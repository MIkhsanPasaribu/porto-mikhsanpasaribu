'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            block rounded-md shadow-sm w-full
            ${isDarkMode 
              ? 'bg-[#0A0A0A] text-[#F6F1F1] border-[#146C94] focus:border-[#19A7CE] focus:ring-[#19A7CE]' 
              : 'bg-[#F2F7FF] text-[#10316B] border-[#0B409C]/30 focus:border-[#0B409C] focus:ring-[#0B409C]'}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;