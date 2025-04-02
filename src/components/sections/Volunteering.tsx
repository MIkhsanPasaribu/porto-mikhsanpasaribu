'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

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
  
  useEffect(() => {
    const fetchVolunteering = async () => {
      try {
        const { data, error } = await supabase
          .from('volunteering')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) throw error;
        
        setVolunteering(data || []);
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
        setVolunteering(fallbackVolunteering);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVolunteering();
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Volunteering</h2>
        <div className="flex justify-center">
          <div className="animate-pulse h-40 w-full max-w-3xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (volunteering.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Volunteering</h2>
      
      <div className="max-w-4xl mx-auto">
        {volunteering.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-10 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {item.organization_logo && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={item.organization_logo} 
                    alt={item.organization} 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{item.role}</h3>
                <p className="text-gray-700 font-medium">{item.organization}</p>
                <p className="text-gray-500">
                  {formatDate(item.start_date)} - {formatDate(item.end_date)}
                </p>
                <p className="text-gray-500 mb-2">{item.location}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}