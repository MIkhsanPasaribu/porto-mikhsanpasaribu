'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

// Import ThreeScene with dynamic import to avoid SSR
const ThreeScene = dynamic(() => import('@/components/3d/Scene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-black"></div>
});

export default function ThreeSceneWrapper() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-black"></div>;
  }
  
  return (
    <Suspense fallback={<div className="absolute inset-0 -z-10 bg-black"></div>}>
      <ThreeScene />
    </Suspense>
  );
}