/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/lib/ThemeContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactsAdmin from '@/components/admin/ContactsAdmin';

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
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Define sections with descriptions for the dashboard
  const sections = [
    { 
      name: 'Projects', 
      table: 'projects', 
      description: 'Manage your portfolio projects',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      href: '/admin/projects'
    },
    { 
      name: 'Skills', 
      table: 'skills', 
      description: 'Update your technical skills',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      href: '/admin/skills'
    },
    { 
      name: 'Experiences', 
      table: 'experiences', 
      description: 'Edit your work experience',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      href: '/admin/experiences'
    },
    { 
      name: 'Education', 
      table: 'education', 
      description: 'Manage your educational background',
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
      href: '/admin/education'
    },
    { 
      name: 'Certifications', 
      table: 'certifications', 
      description: 'Add or update your certifications',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      href: '/admin/certifications'
    },
    { 
      name: 'Awards', 
      table: 'awards', 
      description: 'Showcase your achievements',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      href: '/admin/awards'
    },
    { 
      name: 'Languages', 
      table: 'languages', 
      description: 'Update your language proficiencies',
      icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
      href: '/admin/languages'
    },
    { 
      name: 'Organizations', 
      table: 'organizations', 
      description: 'Manage your organizational affiliations',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      href: '/admin/organizations'
    },
    { 
      name: 'Volunteering', 
      table: 'volunteering', 
      description: 'Add volunteer experience',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      href: '/admin/volunteering'
    },
    { 
      name: 'Contact Messages', 
      table: 'contacts', 
      description: 'View messages from visitors',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      href: '/admin/contacts'
    },
  ];
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Improved fetch method for more reliable counts
        const statsPromises = sections.map(async (section) => {
          try {
            // Force a fresh fetch with no caching
            const { count, error } = await supabase
              .from(section.table)
              .select('*', { count: 'exact', head: true })
              .limit(0);
            
            if (error) {
              console.error(`Error fetching ${section.name}:`, error);
              throw error;
            }
            
            return {
              name: section.name,
              count: count || 0,
              icon: section.icon,
              route: `/admin/${section.table}`
            };
          } catch (err) {
            console.error(`Error fetching stats for ${section.name}:`, err);
            return {
              name: section.name,
              count: 0,
              icon: section.icon,
              route: `/admin/${section.table}`
            };
          }
        });
        
        const statsResults = await Promise.all(statsPromises);
        setStats(statsResults);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchStats();
    
    // Set up a more reliable real-time subscription system
    const tables = [
      'projects', 'skills', 'experiences', 'education', 
      'certifications', 'awards', 'languages', 
      'organizations', 'volunteering', 'contacts'
    ];
    
    // Create a single channel with multiple subscriptions for better performance
    const channel = supabase.channel('db-changes');
    
    // Add subscriptions for each table to the channel
    tables.forEach(table => {
      channel.on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table 
        },
        (payload) => {
          console.log(`Change detected in ${table}:`, payload);
          fetchStats(); // Refresh all stats when any change is detected
        }
      );
    });
    
    // Subscribe to the channel
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to database changes');
      }
    });
    
    // Return cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access the admin dashboard</h1>
          <button
            onClick={() => router.push('/admin')}
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-[#19A7CE] hover:bg-[#146C94] text-white' 
                : 'bg-[#0B409C] hover:bg-[#10316B] text-white'
            }`}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      <div className="mb-8">
        <motion.h1 
          className={`text-3xl font-bold ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        <motion.p 
          className={`mt-2 ${isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome back, {user?.email}
        </motion.p>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className={`flex space-x-4 border-b ${isDarkMode ? 'border-[#146C94]/30' : 'border-[#0B409C]/20'}`}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-4 font-medium transition-colors ${
              activeTab === 'dashboard' 
                ? isDarkMode 
                  ? 'text-[#19A7CE] border-b-2 border-[#19A7CE]' 
                  : 'text-[#0B409C] border-b-2 border-[#0B409C]'
                : isDarkMode
                  ? 'text-[#F6F1F1]/70 hover:text-[#F6F1F1]'
                  : 'text-[#10316B]/70 hover:text-[#10316B]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-4 font-medium transition-colors ${
              activeTab === 'contacts' 
                ? isDarkMode 
                  ? 'text-[#19A7CE] border-b-2 border-[#19A7CE]' 
                  : 'text-[#0B409C] border-b-2 border-[#0B409C]'
                : isDarkMode
                  ? 'text-[#F6F1F1]/70 hover:text-[#F6F1F1]'
                  : 'text-[#10316B]/70 hover:text-[#10316B]'
            }`}
          >
            Contact Messages
          </button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-lg p-6 h-32 animate-pulse ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                      : 'bg-white border border-[#0B409C]/10'
                  }`}
                >
                  <div className={`h-4 w-24 rounded ${isDarkMode ? 'bg-[#146C94]/30' : 'bg-[#0B409C]/20'}`}></div>
                  <div className={`h-8 w-16 rounded mt-4 ${isDarkMode ? 'bg-[#146C94]/30' : 'bg-[#0B409C]/20'}`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className={`block p-6 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-[#0A0A0A] border border-[#146C94]/30 hover:border-[#19A7CE]/50'
                      : 'bg-white border border-[#0B409C]/10 hover:border-[#0B409C]/30'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${
                      isDarkMode
                        ? 'bg-[#146C94]/20 text-[#19A7CE]'
                        : 'bg-[#0B409C]/10 text-[#0B409C]'
                    }`}>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-lg font-medium ${
                        isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                      }`}>
                        {section.name}
                      </h3>
                      <p className={`mt-1 text-sm ${
                        isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                      }`}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Quick Actions Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => router.push('/admin/projects/new')}
                className={`p-4 rounded-lg flex items-center transition-colors ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] hover:bg-[#146C94]/20 text-[#F6F1F1] border border-[#146C94]/20' 
                    : 'bg-white hover:bg-[#0B409C]/5 text-[#10316B] border border-[#0B409C]/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Project
              </button>
              
              <button 
                onClick={() => router.push('/admin/experiences/new')}
                className={`p-4 rounded-lg flex items-center transition-colors ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] hover:bg-[#146C94]/20 text-[#F6F1F1] border border-[#146C94]/20' 
                    : 'bg-white hover:bg-[#0B409C]/5 text-[#10316B] border border-[#0B409C]/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Add Experience
              </button>
              
              <button 
                onClick={() => router.push('/admin/skills/new')}
                className={`p-4 rounded-lg flex items-center transition-colors ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] hover:bg-[#146C94]/20 text-[#F6F1F1] border border-[#146C94]/20' 
                    : 'bg-white hover:bg-[#0B409C]/5 text-[#10316B] border border-[#0B409C]/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Add Skill
              </button>
              
              <button 
                onClick={() => router.push('/')}
                className={`p-4 rounded-lg flex items-center transition-colors ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] hover:bg-[#146C94]/20 text-[#F6F1F1] border border-[#146C94]/20' 
                    : 'bg-white hover:bg-[#0B409C]/5 text-[#10316B] border border-[#0B409C]/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Website
              </button>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Contact Messages Tab */}
      {activeTab === 'contacts' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ContactsAdmin />
        </motion.div>
      )}
    </div>
  );
}