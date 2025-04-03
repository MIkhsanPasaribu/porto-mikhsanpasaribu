'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';

// Import ThreeScene with dynamic import to avoid SSR
const ThreeScene = dynamic(() => import('@/components/3d/Scene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000] to-[#146C94]/30"></div>
});

export default function ThreeSceneWrapper() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) {
    return <div className={`absolute inset-0 -z-10 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#000000] to-[#146C94]/30' 
        : 'bg-gradient-to-b from-[#F2F7FF] to-[#0B409C]/20'
    }`}></div>;
  }
  
  return (
    <Suspense fallback={<div className={`absolute inset-0 -z-10 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#000000] to-[#146C94]/30' 
        : 'bg-gradient-to-b from-[#F2F7FF] to-[#0B409C]/20'
    }`}></div>}>
      <ThreeScene />
    </Suspense>
  );
}