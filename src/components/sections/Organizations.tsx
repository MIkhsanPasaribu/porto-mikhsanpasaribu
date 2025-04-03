/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Organization {
  id: number;
  name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  logo: string | null;
}

export default function OrganizationsSection() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    console.log('OrganizationsSection mounted');
    
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations data...');
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('start_date', { ascending: false });
        
        console.log('Organizations data response:', { data, error });
        
        // Handle empty error objects
        if (error && (typeof error === 'object' && Object.keys(error).length > 0)) {
          // Try to handle auth error
          if (!await handleAuthError(error)) {
            throw new Error('Authentication error, please refresh the page');
          }
          throw error;
        }
        
        // If we have data, use it
        if (data && Array.isArray(data)) {
          console.log('Setting organizations data:', data.length, 'items');
          setOrganizations(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        // Fallback data
        const fallbackOrganizations = [
          {
            id: 1,
            name: 'Tech Community Network',
            role: 'Board Member',
            start_date: '2020-01-01',
            end_date: null,
            description: 'Helping organize tech events and mentorship programs for underrepresented groups in tech.',
            logo: '/logos/tech-community.png'
          },
          {
            id: 2,
            name: 'Developers Association',
            role: 'Member',
            start_date: '2018-06-01',
            end_date: '2019-12-31',
            description: 'Participated in monthly meetups and contributed to open source projects.',
            logo: '/logos/dev-association.png'
          }
        ];
        console.log('Using fallback organizations data');
        setOrganizations(fallbackOrganizations);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganizations();
    
    return () => {
      console.log('OrganizationsSection unmounted');
    };
  }, []);
  
  // Add this debug output
  console.log('OrganizationsSection render state:', { loading, organizationsCount: organizations.length, isDarkMode });
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  // Replace the existing empty state with:
  if (organizations.length === 0) {
    return <EmptySection title="Organizations" message="No organizations to display." />;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>Organizations</h2>
        
        <div className="space-y-8">
          {organizations.map((org) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
                  : 'bg-[#F2F7FF] border border-[#0B409C]/10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {org.logo && (
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="w-16 h-16 relative">
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                  }`}>{org.name}</h3>
                  <p className={`text-lg font-medium ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>{org.role}</p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                  }`}>
                    {formatDate(org.start_date)} - {formatDate(org.end_date)}
                  </p>
                  {org.description && (
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                    }`}>{org.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}