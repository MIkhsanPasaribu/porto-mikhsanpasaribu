'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaEnvelope, FaCode, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-12 ${
      isDarkMode ? 'bg-[#0A0A0A] border-t border-[#146C94]/20' : 'bg-[#F2F7FF] border-t border-[#0B409C]/10'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className={`text-xl font-bold font-poppins ${
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
                className={`p-3 rounded-full transition-colors ${
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
                className={`p-3 rounded-full transition-colors ${
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
                className={`p-3 rounded-full transition-colors ${
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
                className={`p-3 rounded-full transition-colors ${
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
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
                    : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
                }`}
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </motion.a>
            </div>
            
            <p className={`text-sm ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              Let&apos;s connect and build something amazing together!
            </p>
          </div>
        </div>
        
        {/* Footer navigation links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#home" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="#projects" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Skills
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#skills" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link 
                  href="#languages" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Languages
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Experience
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#experience" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Work Experience
                </Link>
              </li>
              <li>
                <Link 
                  href="#education" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Education
                </Link>
              </li>
              <li>
                <Link 
                  href="#certifications" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              More
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#awards" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Awards
                </Link>
              </li>
              <li>
                <Link 
                  href="#organizations" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Organizations
                </Link>
              </li>
              <li>
                <Link 
                  href="#volunteering" 
                  className={`text-sm hover:underline ${
                    isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#19A7CE]' : 'text-[#10316B]/70 hover:text-[#0B409C]'
                  }`}
                >
                  Volunteering
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer bottom with copyright */}
        <div className="pt-6 border-t border-opacity-20 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${
            isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
          }`}>
            &copy; {currentYear} M. Ikhsan Pasaribu. All rights reserved.
          </p>
          
          <div className={`flex items-center mt-4 md:mt-0 text-sm ${
            isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
          }`}>
            <span className="flex items-center">
              <FaCode className="mr-1" /> with <FaHeart className="mx-1 text-red-500" /> in Padang, Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}