'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { useRouter } from 'next/navigation';

export default function AdminBubble() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const router = useRouter();
  const [showAdminBubble, setShowAdminBubble] = useState(false);
  const adminBubbleTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Check if admin bubble should be shown
  useEffect(() => {
    const checkAdminBubble = () => {
      const shouldShow = localStorage.getItem('showAdminButton') === 'true';
      
      if (shouldShow) {
        setShowAdminBubble(true);
        
        // Set a timer to hide the bubble after 10 seconds
        if (adminBubbleTimer.current) {
          clearTimeout(adminBubbleTimer.current);
        }
        
        adminBubbleTimer.current = setTimeout(() => {
          setShowAdminBubble(false);
          localStorage.removeItem('showAdminButton');
        }, 10000); // 10 seconds
      }
    };
    
    // Check on initial load
    checkAdminBubble();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', checkAdminBubble);
    
    return () => {
      window.removeEventListener('storage', checkAdminBubble);
      if (adminBubbleTimer.current) {
        clearTimeout(adminBubbleTimer.current);
      }
    };
  }, []);
  
  if (!showAdminBubble) return null;
  
  return (
    <AnimatePresence>
      {showAdminBubble && (
        <motion.div
          className="fixed bottom-24 right-6 z-50"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <motion.button
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
              isDarkMode 
                ? 'bg-[#19A7CE] text-white hover:bg-[#146C94]' 
                : 'bg-[#0B409C] text-white hover:bg-[#10316B]'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (adminBubbleTimer.current) {
                clearTimeout(adminBubbleTimer.current);
              }
              localStorage.removeItem('showAdminButton');
              router.push('/admin');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}