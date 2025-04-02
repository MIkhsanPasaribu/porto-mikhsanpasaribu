'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-8 ${isDarkMode ? 'bg-[#000000] border-t border-[#146C94]' : 'bg-[#F2F7FF] border-t border-[#0B409C]/20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
              &copy; {currentYear} M. Ikhsan Pasaribu. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="https://github.com/mikhsanpasaribu" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-sm ${isDarkMode ? 'text-[#19A7CE] hover:text-[#F6F1F1]' : 'text-[#0B409C] hover:text-[#10316B]'} transition-colors`}
            >
              GitHub
            </Link>
            <Link 
              href="https://linkedin.com/in/mikhsanpasaribu" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-sm ${isDarkMode ? 'text-[#19A7CE] hover:text-[#F6F1F1]' : 'text-[#0B409C] hover:text-[#10316B]'} transition-colors`}
            >
              LinkedIn
            </Link>
            <Link 
              href="mailto:mikhsanpasaribu@gmail.com"
              className={`text-sm ${isDarkMode ? 'text-[#19A7CE] hover:text-[#F6F1F1]' : 'text-[#0B409C] hover:text-[#10316B]'} transition-colors`}
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}