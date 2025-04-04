'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
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
  current: boolean;
}

export default function OrganizationsSection() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) {
          console.error('Error fetching organizations:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setOrganizations(data);
        } else {
          setOrganizations([]);
        }
      } catch (error) {
        console.error('Error in organizations fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganizations();
    
    // Set up real-time subscription
    const organizationsSubscription = supabase
      .channel('organizations-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'organizations' }, 
        () => {
          console.log('Organizations data changed, refreshing...');
          fetchOrganizations();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(organizationsSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="organizations" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Organizations
          </h2>
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
            }`}></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || organizations.length === 0) {
    return <EmptySection title="Organizations" message="No organizations to display yet." />;
  }
  
  return (
    <section id="organizations" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Organizations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {organizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg ${
                isDarkMode 
                  ? 'bg-[#0A0A0A] border border-[#146C94]/20' 
                  : 'bg-white shadow-md'
              }`}
            >
              <div className="flex items-start">
                {org.logo && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={org.logo} 
                      alt={`${org.name} logo`} 
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>
                    {org.name}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    {org.role}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                  }`}>
                    {new Date(org.start_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })} - {
                      org.current 
                        ? 'Present' 
                        : org.end_date 
                          ? new Date(org.end_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            }) 
                          : 'Present'
                    }
                  </p>
                  {org.description && (
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                    }`}>
                      {org.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}