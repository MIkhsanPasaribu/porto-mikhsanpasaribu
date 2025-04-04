'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-8 ${
      isDarkMode ? 'bg-[#0A0A0A] border-t border-[#146C94]/20' : 'bg-[#F2F7FF]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
              }`}>
                M. Ikhsan Pasaribu
              </span>
            </Link>
            <p className={`mt-2 text-sm ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              Software Developer | Full-Stack Developer | AI Engineer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <motion.a 
                href="https://linkedin.com/in/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </motion.a>
              
              <motion.a 
                href="https://github.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </motion.a>
              
              <motion.a 
                href="https://instagram.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </motion.a>
              
              <motion.a 
                href="https://facebook.com/mikhsanpasaribu" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] text-[#F6F1F1] hover:bg-[#146C94] border border-[#146C94]/50' 
                    : 'bg-white text-[#10316B] hover:bg-[#0B409C] hover:text-white shadow-sm'
                } transition-colors duration-300`}
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </motion.a>
            </div>
            
            <p className={`text-sm ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              © {currentYear} M. Ikhsan Pasaribu. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link 
              href="#about" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              About
            </Link>
            <Link 
              href="#experience" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              Experience
            </Link>
            <Link 
              href="#projects" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              Skills
            </Link>
            <Link 
              href="#education" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              Education
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/80 hover:text-[#19A7CE]' : 'text-[#10316B]/80 hover:text-[#0B409C]'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}