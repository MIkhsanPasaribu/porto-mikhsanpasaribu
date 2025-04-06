/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SectionEditor from '@/components/admin/SectionEditor';
import { handleAuthError } from '@/lib/supabase';

export default function AdminItemPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Ensure params are properly extracted and converted to string
  const section = typeof params.section === 'string' ? params.section : String(params.section);
  const id = typeof params.id === 'string' ? params.id : String(params.id);
  
  // Add debugging for params
  useEffect(() => {
    console.log('Route params:', { section, id, rawParams: params });
  }, [section, id, params]);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          await handleAuthError(error);
          router.push('/admin');
          return;
        }
        
        if (!data.user) {
          router.push('/admin');
          return;
        }
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/admin');
      }
    };
    
    checkAuth();
  }, [router]);
  
  useEffect(() => {
    const fetchItem = async () => {
      if (!section || !id) {
        setError('Invalid section or ID parameter');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        console.log(`Fetching ${section} item with id ${id}`);
        
        const { data, error } = await supabase
          .from(section)
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching item:', error);
          setError(`Error fetching item: ${error.message}`);
          throw error;
        }
        
        if (data) {
          console.log('Item data:', data);
          setItem(data);
        } else {
          setError('Item not found');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (section && id) {
      fetchItem();
    }
  }, [section, id]);
  
  // Define fields for each section
  const getFields = () => {
    switch (section) {
      case 'about':
        return [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'image_url', label: 'Profile Image', type: 'image' },
          { name: 'resume_url', label: 'Resume URL', type: 'text' },
        ];
      case 'experiences':
        return [
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'position', label: 'Position', type: 'text', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'start_date', label: 'Start Date', type: 'date', required: true },
          { name: 'end_date', label: 'End Date (leave empty for current position)', type: 'date' },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'technologies', label: 'Technologies', type: 'tags', required: true },
          { name: 'company_logo', label: 'Company Logo', type: 'image' },
        ];
      case 'projects':
        return [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'image_url', label: 'Project Image', type: 'image' },
          { name: 'technologies', label: 'Technologies', type: 'tags', required: true },
          { name: 'github_url', label: 'GitHub URL', type: 'text' },
          { name: 'live_url', label: 'Live Demo URL', type: 'text' },
          { name: 'order', label: 'Display Order', type: 'number', required: true },
        ];
      case 'skills':
        return [
          { name: 'name', label: 'Skill Name', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'select', options: ['frontend', 'backend', 'database', 'devops', 'other'], required: true },
          { name: 'proficiency', label: 'Proficiency (1-100)', type: 'number', required: true },
          { name: 'icon', label: 'Icon URL', type: 'text' },
        ];
      case 'awards':
        return [
          { name: 'title', label: 'Award Title', type: 'text', required: true },
          { name: 'issuer', label: 'Issuer', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'image_url', label: 'Award Image', type: 'image' },
        ];
      default:
        return [];
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Item not found.</span>
        </div>
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit {section.charAt(0).toUpperCase() + section.slice(1).replace(/s$/, '')}</h1>
      
      <SectionEditor 
        tableName={section}
        initialData={item}
        fields={getFields() as Array<{
          name: string;
          label: string;
          type: "number" | "text" | "textarea" | "image" | "date" | "tags" | "select" | "checkbox";
          options?: string[];
          required?: boolean;
        }>}
        onSuccess={() => router.push('/admin/dashboard')}
      />
    </div>
  );
}