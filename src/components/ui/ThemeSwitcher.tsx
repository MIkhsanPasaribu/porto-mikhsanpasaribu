'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main bubble button */}
      <motion.button
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          theme === 'light' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-sky-500 text-white hover:bg-sky-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>
      
      {/* Theme options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-3 flex flex-col gap-2 min-w-[150px]"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => { setTheme('light'); setIsOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                theme === 'light' 
                  ? 'bg-cream-100 text-blue-700' 
                  : 'hover:bg-slate-700 text-gray-800 dark:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Light Mode</span>
            </button>
            
            <button
              onClick={() => { setTheme('dark'); setIsOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-sky-900 text-sky-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>Dark Mode</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}