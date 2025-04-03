/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Volunteering {
  id: number;
  organization: string;
  role: string;
  start_date: string;
  end_date: string | null;
  location: string;
  description: string;
  organization_logo: string | null;
}

export default function VolunteeringSection() {
  const [volunteering, setVolunteering] = useState<Volunteering[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    console.log('VolunteeringSection mounted');
    
    const fetchVolunteering = async () => {
      try {
        console.log('Fetching volunteering data...');
        const { data, error } = await supabase
          .from('volunteering')
          .select('*')
          .order('start_date', { ascending: false });
        
        console.log('Volunteering data response:', { data, error });
        
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
          console.log('Setting volunteering data:', data.length, 'items');
          setVolunteering(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching volunteering:', error);
        // Fallback data
        const fallbackVolunteering = [
          {
            id: 1,
            organization: 'Tech for Good',
            role: 'Web Development Volunteer',
            start_date: '2022-01-01',
            end_date: null,
            location: 'Remote',
            description: 'Developing websites for non-profit organizations. Providing technical support and training for staff members.',
            organization_logo: '/logos/tech-for-good.png'
          },
          {
            id: 2,
            organization: 'Community Code Camp',
            role: 'Mentor',
            start_date: '2020-06-01',
            end_date: '2021-12-31',
            location: 'Jakarta, Indonesia',
            description: 'Mentored underprivileged students in web development. Organized coding workshops and hackathons.',
            organization_logo: '/logos/code-camp.png'
          }
        ];
        console.log('Using fallback volunteering data');
        setVolunteering(fallbackVolunteering);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVolunteering();
    
    return () => {
      console.log('VolunteeringSection unmounted');
    };
  }, []);
  
  // Add this debug output
  console.log('VolunteeringSection render state:', { loading, volunteeringCount: volunteering.length, isDarkMode });
  
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
  if (volunteering.length === 0) {
    return <EmptySection title="Volunteering" message="No volunteering experience to display." />;
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
        }`}>Volunteering</h2>
        
        <div className="space-y-10">
          {volunteering.map((item) => (
            <motion.div
              key={item.id}
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
                {item.organization_logo && (
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="w-16 h-16 relative">
                      <img
                        src={item.organization_logo}
                        alt={`${item.organization} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                  }`}>{item.role}</h3>
                  <p className={`text-lg font-medium ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>{item.organization}</p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                  }`}>
                    {formatDate(item.start_date)} - {formatDate(item.end_date)} • {item.location}
                  </p>
                  <p className={`mt-2 ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}