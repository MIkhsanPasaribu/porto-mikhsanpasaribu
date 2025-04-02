'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div
      className={`
        rounded-lg shadow-md overflow-hidden
        ${isDarkMode 
          ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
          : 'bg-[#F2F7FF] border border-[#0B409C]/10'}
        ${hover 
          ? isDarkMode 
            ? 'hover:shadow-lg hover:border-[#19A7CE]/50 transition-all duration-300' 
            : 'hover:shadow-lg hover:border-[#0B409C]/30 transition-all duration-300' 
          : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}