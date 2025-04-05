'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import Button from '@/components/ui/Button';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function HomeSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Tech-focused titles with code syntax
  const titles = [
    { role: "Full Stack Developer", syntax: "<code>frontend + backend</code>" },
    { role: "Software Engineer", syntax: "function buildSolutions() { }" },
    { role: "AI Engineer & Enthusiast", syntax: "model.train(data)" }
  ];
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const fullName = "M. Ikhsan Pasaribu";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // Typewriter effect for name
  useEffect(() => {
    if (displayedText.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullName.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedText, fullName]);
  
  // Effect to rotate through titles after name typing is complete
  useEffect(() => {
    if (!isTypingComplete) return;
    
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Longer duration for reading code syntax
    
    return () => clearInterval(interval);
  }, [isTypingComplete, titles.length]);
  
  // Particles initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  
  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Further reduced opacity gradient for better 3D visibility */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#000000]/60 via-[#000000]/40 to-transparent' 
            : 'bg-gradient-to-b from-[#F2F7FF]/60 via-[#F2F7FF]/40 to-transparent'
        }`}></div>
      </div>
      
      {/* Tech-themed particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: isDarkMode ? "#19A7CE" : "#0B409C",
            },
            links: {
              color: isDarkMode ? "#19A7CE" : "#0B409C",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <motion.h1 
            className={`font-poppins text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode 
                ? 'text-[#F6F1F1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' 
                : 'text-[#10316B] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]'
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block ml-1 w-1 h-10 sm:h-12 md:h-14 align-middle"
              style={{ 
                backgroundColor: isDarkMode ? '#F6F1F1' : '#10316B',
                display: isTypingComplete ? 'none' : 'inline-block'
              }}
            />
          </motion.h1>
          
          <div className="h-24 sm:h-28 md:h-32 mb-8 relative">
            <AnimatePresence mode="wait">
              {isTypingComplete && (
                <motion.div 
                  key={currentTitleIndex}
                  className="absolute w-full left-0 right-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className={`font-poppins text-xl sm:text-2xl md:text-3xl font-medium ${
                    isDarkMode 
                      ? 'text-[#19A7CE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]' 
                      : 'text-[#0B409C] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]'
                  }`}>
                    {titles[currentTitleIndex].role}
                  </p>
                  <p className={`font-jetbrains-mono text-sm sm:text-base md:text-lg mt-2 ${
                    isDarkMode 
                      ? 'text-[#19A7CE]/80' 
                      : 'text-[#0B409C]/80'
                  }`}>
                    {titles[currentTitleIndex].syntax}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
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
            className={`font-poppins text-sm mb-2 font-medium ${
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