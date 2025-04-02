'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeSection() {
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const router = useRouter();
  
  // Reset click count after a timeout
  useEffect(() => {
    if (secretClickCount > 0) {
      const timer = setTimeout(() => {
        setSecretClickCount(0);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [secretClickCount]);
  
  // Check for secret click pattern (5 clicks)
  useEffect(() => {
    if (secretClickCount >= 5) {
      setShowAdminLink(true);
      
      // Hide admin link after 5 seconds
      const timer = setTimeout(() => {
        setShowAdminLink(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [secretClickCount]);
  
  const handleSecretClick = () => {
    setSecretClickCount(prev => prev + 1);
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="text-center text-white p-8 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          M. Ikhsan Pasaribu
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-2xl mb-6">Software Developer & AI Enthusiast</h2>
          
          <div className="flex justify-center space-x-4">
            <Link href="#about">
              <motion.button 
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </Link>
            
            <Link href="#contact">
              <motion.button 
                className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
          
          {/* Hidden element for admin access */}
          <div 
            className="mt-16 text-xs opacity-0 cursor-default select-none"
            onClick={handleSecretClick}
          >
            &nbsp;
          </div>
          
          {/* Admin link that appears after secret pattern */}
          {showAdminLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button 
                onClick={() => router.push('/admin')}
                className="mt-4 text-sm text-blue-300 hover:text-blue-100"
              >
                Admin Access
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}