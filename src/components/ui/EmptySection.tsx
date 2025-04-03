'use client';

import { useTheme } from '@/lib/ThemeContext';

interface EmptySectionProps {
  title: string;
  message?: string;
}

export default function EmptySection({ title, message = 'No items to display.' }: EmptySectionProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className={`text-3xl font-bold text-center mb-12 ${
        isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
      }`}>{title}</h2>
      <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{message}</p>
    </div>
  );
}