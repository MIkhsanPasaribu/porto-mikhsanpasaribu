/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, handleAuthError } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';
import EmptySection from '@/components/ui/EmptySection';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  issuer_logo: string | null;
}

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('issue_date', { ascending: false });
        
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
          setCertifications(data);
        } else {
          // If no data or data is not an array, use fallback
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching certifications:', error);
        // Fallback data
        const fallbackCertifications = [
          {
            id: 1,
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            issue_date: '2022-05-15',
            expiry_date: '2025-05-15',
            credential_id: 'AWS-123456',
            credential_url: 'https://aws.amazon.com/verification',
            issuer_logo: '/logos/aws.png'
          },
          {
            id: 2,
            name: 'Professional Scrum Master I',
            issuer: 'Scrum.org',
            issue_date: '2021-10-10',
            expiry_date: null,
            credential_id: 'PSM-123456',
            credential_url: 'https://www.scrum.org/verification',
            issuer_logo: '/logos/scrum.png'
          }
        ];
        setCertifications(fallbackCertifications);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCertifications();
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No Expiration';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (certifications.length === 0) {
    return <EmptySection title="Certifications" message="No certifications to display." />;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Licenses & Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                {cert.issuer_logo && (
                  <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={cert.issuer_logo}
                      alt={cert.issuer}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{cert.name}</h3>
                  <p className="text-blue-600">{cert.issuer}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-2 mb-2">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Issued: {formatDate(cert.issue_date)}</span>
                    
                    {cert.expiry_date && (
                      <span className="ml-4">Expires: {formatDate(cert.expiry_date)}</span>
                    )}
                  </div>
                  
                  {cert.credential_id && (
                    <p className="text-sm text-gray-600 mb-2">
                      Credential ID: {cert.credential_id}
                    </p>
                  )}
                  
                  {(cert as { description?: string }).description && (
                    <p className="text-gray-700 text-sm mb-3">{(cert as { description?: string }).description}</p>
                  )}
                  
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span>See credential</span>
                      <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
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
