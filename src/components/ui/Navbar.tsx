/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Admin access secret pattern
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Update the handleLogoClick function in Navbar.tsx
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setLogoClickCount(prev => prev + 1);
    
    // Reset the counter after 2 seconds of inactivity
    if (logoClickTimer.current) {
      clearTimeout(logoClickTimer.current);
    }
    
    logoClickTimer.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
    
    // If clicked 5 times in succession, show admin bubble
    if (logoClickCount === 4) { // 4 because this will be the 5th click
    // Store in localStorage that admin button should be shown
    localStorage.setItem('showAdminButton', 'true');
    // Force a re-render of the page
    window.dispatchEvent(new Event('storage'));
    setLogoClickCount(0);
  }
};
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isDarkMode = theme === 'dark';
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experiences' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Awards', href: '#awards' },
    { name: 'Languages', href: '#languages' },
    { name: 'Organizations', href: '#organizations' },
    { name: 'Volunteering', href: '#volunteering' },
    { name: 'Contact', href: '#contact' },
  ];
  
  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-[#000000] shadow-lg shadow-[#146C94]/30' 
            : 'bg-[#F2F7FF] shadow-md'
          : isDarkMode
            ? 'bg-transparent border-b border-[#FDEB34]/50' 
            : 'bg-[#F2F7FF]/70 backdrop-blur-sm border-b border-[#0B409C]/30'
      } ${isScrolled ? 'py-2' : 'py-4'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link 
              href="#"
              onClick={handleLogoClick}
              className={`font-bold text-xl transition-colors ${
                isScrolled 
                  ? isDarkMode 
                    ? 'text-[#19A7CE]' 
                    : 'text-[#10316B]' 
                  : isDarkMode
                    ? 'text-white'
                    : 'text-[#FDBE34]'
              }`}
            >
              M. Ikhsan Pasaribu
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-20 ${
                    isScrolled 
                      ? isDarkMode
                        ? 'text-[#F6F1F1] hover:text-[#19A7CE] hover:bg-[#146C94]' 
                        : 'text-[#10316B] hover:text-[#0B409C] hover:bg-[#FDBE34]/20'
                      : isDarkMode
                        ? 'text-gray-200 hover:text-[#19A7CE] hover:bg-[#19A7CE]/20' 
                        : 'text-[#FDBE34] hover:text-[#0B409C] hover:bg-[#0B409C]/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled 
                  ? isDarkMode
                    ? 'text-[#F6F1F1] hover:text-[#19A7CE] hover:bg-[#146C94]' 
                    : 'text-[#10316B] hover:text-[#0B409C] hover:bg-[#FDBE34]/20'
                  : isDarkMode
                    ? 'text-gray-200 hover:text-[#19A7CE] hover:bg-[#19A7CE]/20'
                    : 'text-[#FDBE34] hover:text-[#0B409C] hover:bg-[#0B409C]/10'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#19A7CE] dark:focus:ring-[#0B409C]`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            ref={mobileMenuRef}
            className={`md:hidden ${
              isDarkMode ? 'bg-[#000000] border-t border-[#146C94]' : 'bg-[#F2F7FF] border-t border-[#0B409C]/20'
            } shadow-lg`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? 'text-[#F6F1F1] hover:text-[#19A7CE] hover:bg-[#146C94]/30' 
                      : 'text-[#10316B] hover:text-[#0B409C] hover:bg-[#0B409C]/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}