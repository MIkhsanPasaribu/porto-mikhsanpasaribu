'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-8 ${
      isDarkMode ? 'bg-[#0A0A0A] border-t border-[#146C94]/20' : 'bg-[#F2F7FF] border-t border-[#0B409C]/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-5 mb-6">
            <motion.a 
              href="https://linkedin.com/in/mikhsanpasaribu" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                  : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
              }`}
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </motion.a>
            
            <motion.a 
              href="https://github.com/mikhsanpasaribu" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                  : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
              }`}
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </motion.a>
            
            <motion.a 
              href="https://www.instagram.com/mikhsanpasaribu/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                  : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
              }`}
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </motion.a>
            
            <motion.a 
              href="https://www.facebook.com/mikhsanpasaribu" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                  : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
              }`}
              aria-label="Facebook"
            >
              <FaFacebook className="h-5 w-5" />
            </motion.a>
            
            <motion.a 
              href="mailto:mikhsanpasaribu2@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                  : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
              }`}
              aria-label="Email"
            >
              <FaEnvelope className="h-5 w-5" />
            </motion.a>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <Link 
              href="#home" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
              }`}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
              }`}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
              }`}
            >
              Skills
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm hover:underline ${
                isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Copyright */}
          <div className={`text-center text-sm ${
            isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
          }`}>
            <p>© {currentYear} M. Ikhsan Pasaribu. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}