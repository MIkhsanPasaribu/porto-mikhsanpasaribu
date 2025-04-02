'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Organization {
  id: number;
  name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  organization_logo: string | null;
}

export default function OrganizationsSection() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) throw error;
        
        setOrganizations(data || []);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        // Fallback data
        const fallbackOrganizations = [
          {
            id: 1,
            name: 'Developer Student Club',
            role: 'Lead',
            start_date: '2021-08-01',
            end_date: '2022-07-31',
            description: 'Led a team of student developers in creating solutions for local community problems. Organized workshops and hackathons to promote coding skills among students.',
            organization_logo: '/logos/dsc.png'
          },
          {
            id: 2,
            name: 'Computer Science Society',
            role: 'Vice President',
            start_date: '2019-09-01',
            end_date: '2021-05-31',
            description: 'Coordinated events and activities for computer science students. Managed relationships with industry partners for sponsorships and career opportunities.',
            organization_logo: '/logos/cs-society.png'
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
              {org.organization_logo && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={org.organization_logo} 
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