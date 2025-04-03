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
        {/* Further reduced opacity gradient for better 3D visibility */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#000000]/60 via-[#000000]/40 to-transparent' 
            : 'bg-gradient-to-b from-[#F2F7FF]/60 via-[#F2F7FF]/40 to-transparent'
        }`}></div>
      </div>
      
      {/* Removed the semi-transparent overlay to make 3D elements more visible */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <motion.h1 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode 
                ? 'text-[#F6F1F1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' 
                : 'text-[#10316B] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            M. Ikhsan Pasaribu
          </motion.h1>
          
          <motion.p 
            className={`text-xl sm:text-2xl md:text-3xl mb-8 ${
              isDarkMode 
                ? 'text-[#19A7CE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' 
                : 'text-[#0B409C] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]'
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
      
      {/* Enhanced scroll indicator with better alignment and animation */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <motion.div 
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.p 
            className={`text-sm mb-2 font-medium ${
              isDarkMode 
                ? 'text-[#F6F1F1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]' 
                : 'text-[#10316B] drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]'
            }`}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2
            }}
          >
            Scroll Down
          </motion.p>
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                isDarkMode 
                  ? 'text-[#19A7CE] drop-shadow-[0_0_8px_rgba(25,167,206,0.7)]' 
                  : 'text-[#0B409C] drop-shadow-[0_0_8px_rgba(11,64,156,0.7)]'
              }`}
            >
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}