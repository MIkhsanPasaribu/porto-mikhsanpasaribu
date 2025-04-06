'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DebugPage() {
  const router = useRouter();
  
  useEffect(() => {
    console.log('Debug page loaded');
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Routing</h1>
      <p className="mb-4">Klik link di bawah untuk menguji routing:</p>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Test Links:</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <Link href="/admin/projects/edit/2" className="text-blue-500 hover:underline">
                Edit Project 2 (dengan /edit/)
              </Link>
            </li>
            <li>
              <Link href="/admin/projects/2" className="text-blue-500 hover:underline">
                Project 2 (tanpa /edit/)
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Test Buttons:</h2>
          <div className="mt-2 space-y-2">
            <button 
              onClick={() => router.push('/admin/projects/edit/2')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Navigate to Edit Project 2 (router.push)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}