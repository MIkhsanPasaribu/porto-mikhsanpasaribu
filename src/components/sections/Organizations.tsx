/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';

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
    const fetchOrganizations = async () => {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('start_date', { ascending: false });
        
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
        setOrganizations(fallbackOrganizations);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganizations();
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Organizations</h2>
        <div className="flex justify-center">
          <div className="animate-pulse h-40 w-full max-w-3xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (organizations.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Organizations</h2>
      
      <div className="max-w-4xl mx-auto">
        {organizations.map((org, index) => (
          <motion.div 
            key={org.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-10 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {org.logo && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={org.logo}
                    alt={org.name} 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{org.role}</h3>
                <p className="text-gray-700 font-medium">{org.name}</p>
                <p className="text-gray-500 mb-2">
                  {formatDate(org.start_date)} - {formatDate(org.end_date)}
                </p>
                {org.description && (
                  <p className="text-gray-600">{org.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}