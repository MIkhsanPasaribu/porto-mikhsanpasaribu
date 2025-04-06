/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Admin access secret pattern
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimer = useRef<NodeJS.Timeout | null>(null);
  
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
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
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

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-[#0A0A0A]/95 backdrop-blur-sm shadow-lg shadow-[#146C94]/10 border-b border-[#146C94]/20' 
            : 'bg-white/95 backdrop-blur-sm shadow-lg shadow-[#0B409C]/10 border-b border-[#0B409C]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/#home" 
            onClick={handleLogoClick}
            className="flex items-center space-x-2"
          >
            <motion.span 
              className={`text-base md:text-lg font-semibold font-poppins ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              M. Ikhsan Pasaribu
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-[#F6F1F1]/80 hover:text-[#F6F1F1] hover:bg-[#146C94]/20' 
                    : 'text-[#10316B]/80 hover:text-[#10316B] hover:bg-[#0B409C]/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'text-[#F6F1F1] hover:bg-[#146C94]/20' 
                  : 'text-[#10316B] hover:bg-[#0B409C]/10'
              }`}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              isDarkMode 
                ? 'bg-[#0A0A0A] border-b border-[#146C94]/20' 
                : 'bg-white border-b border-[#0B409C]/10'
            }`}
          >
            <div className="px-4 pt-2 pb-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-[#F6F1F1]/80 hover:text-[#F6F1F1] hover:bg-[#146C94]/20' 
                      : 'text-[#10316B]/80 hover:text-[#10316B] hover:bg-[#0B409C]/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}