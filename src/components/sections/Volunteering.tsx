'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Volunteering {
  id: number;
  role: string;
  organization: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  organization_logo: string | null;
  current: boolean;
}

export default function VolunteeringSection() {
  const [volunteering, setVolunteering] = useState<Volunteering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchVolunteering = async () => {
      try {
        const { data, error } = await supabase
          .from('volunteering')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) {
          console.error('Error fetching volunteering:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setVolunteering(data);
        } else {
          setVolunteering([]);
        }
      } catch (error) {
        console.error('Error in volunteering fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVolunteering();
    
    // Set up real-time subscription
    const volunteeringSubscription = supabase
      .channel('volunteering-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'volunteering' }, 
        () => {
          console.log('Volunteering data changed, refreshing...');
          fetchVolunteering();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(volunteeringSubscription);
    };
  }, []);
  
  if (loading) {
    return (
      <section id="volunteering" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Volunteer Experience
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
  
  if (error || volunteering.length === 0) {
    return <EmptySection title="Volunteer Experience" message="No volunteer experience to display yet." />;
  }
  
  return (
    <section id="volunteering" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Volunteer Experience
        </h2>
        
        <div className="space-y-8">
          {volunteering.map((volunteer, index) => (
            <motion.div
              key={volunteer.id}
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
                {volunteer.organization_logo && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={volunteer.organization_logo} 
                      alt={`${volunteer.organization} logo`} 
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
                    {volunteer.role}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    {volunteer.organization}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                  }`}>
                    {new Date(volunteer.start_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })} - {
                      volunteer.current 
                        ? 'Present' 
                        : volunteer.end_date 
                          ? new Date(volunteer.end_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            }) 
                          : 'Present'
                    }
                  </p>
                  {volunteer.description && (
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
                    }`}>
                      {volunteer.description}
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