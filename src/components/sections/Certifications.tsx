'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
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
  const [error, setError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('issue_date', { ascending: false });
        
        if (error) {
          console.error('Error fetching certifications:', error);
          setError(true);
          throw error;
        }
        
        if (data && Array.isArray(data)) {
          setCertifications(data);
        } else {
          setCertifications([]);
        }
      } catch (error) {
        console.error('Error in certifications fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCertifications();
    
    // Set up real-time subscription
    const certificationsSubscription = supabase
      .channel('certifications-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'certifications' }, 
        () => {
          console.log('Certifications data changed, refreshing...');
          fetchCertifications();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(certificationsSubscription);
    };
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No Expiration';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  if (loading) {
    return (
      <section id="certifications" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
          }`}>
            Licenses & Certifications
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
  
  if (error || certifications.length === 0) {
    return <EmptySection title="Licenses & Certifications" message="No certifications to display yet." />;
  }
  
  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Licenses & Certifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
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
                {cert.issuer_logo && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={cert.issuer_logo} 
                      alt={cert.issuer} 
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
                    {cert.name}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    {cert.issuer}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                  }`}>
                    Issued: {formatDate(cert.issue_date)}
                    {cert.expiry_date && ` • Expires: ${formatDate(cert.expiry_date)}`}
                  </p>
                  
                  {cert.credential_id && (
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-[#F6F1F1]/60' : 'text-[#10316B]/60'
                    }`}>
                      Credential ID: {cert.credential_id}
                    </p>
                  )}
                  
                  {cert.credential_url && (
                    <a 
                      href={cert.credential_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-block mt-2 text-sm ${
                        isDarkMode ? 'text-[#19A7CE] hover:text-[#146C94]' : 'text-[#0B409C] hover:text-[#10316B]'
                      }`}
                    >
                      See credential
                      <svg className="ml-1 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
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
