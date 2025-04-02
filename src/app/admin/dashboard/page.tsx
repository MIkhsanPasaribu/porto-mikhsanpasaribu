/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface SectionStats {
  name: string;
  count: number;
  icon: string;
  route: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<SectionStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/admin');
        return;
      }
      
      setUser(data.user);
    };
    
    checkAuth();
  }, [router]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Define sections to fetch stats for
        const sections = [
          { name: 'Projects', table: 'projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
          { name: 'Skills', table: 'skills', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
          { name: 'Experiences', table: 'experiences', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
          { name: 'Education', table: 'education', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
          { name: 'Certifications', table: 'certifications', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
          { name: 'Contact Messages', table: 'contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        ];
        
        // Fetch counts for each section
        const statsPromises = sections.map(async (section) => {
          const { count, error } = await supabase
            .from(section.table)
            .select('*', { count: 'exact', head: true });
          
          if (error) throw error;
          
          return {
            name: section.name,
            count: count || 0,
            icon: section.icon,
            route: `/admin/${section.table}`
          };
        });
        
        const statsResults = await Promise.all(statsPromises);
        setStats(statsResults);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchStats();
    }
  }, [user]);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Welcome, {user?.email}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your portfolio content from this dashboard.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.route}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.count}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <div className="font-medium text-blue-600 hover:text-blue-500">
                    View all<span className="sr-only"> {stat.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}