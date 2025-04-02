'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import Button from '@/components/ui/Button';

export default function HomeSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        {/* Background gradient */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#000000] via-[#000000]/90 to-[#146C94]/30' 
            : 'bg-gradient-to-b from-[#F2F7FF] via-[#F2F7FF]/90 to-[#0B409C]/20'
        }`}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <motion.h1 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            M. Ikhsan Pasaribu
          </motion.h1>
          
          <motion.p 
            className={`text-xl sm:text-2xl md:text-3xl mb-8 ${
              isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Full Stack Developer
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className={`text-sm mb-2 ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>Scroll Down</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg 
              className={`w-6 h-6 ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}