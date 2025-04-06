/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SectionEditor from '@/components/admin/SectionEditor';
import { handleAuthError } from '@/lib/supabase';

export default function AdminEditPage() {
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
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched data:', data);
        setItem(data);
      } catch (err: any) {
        console.error('Error fetching item:', err);
        setError(err.message || `Error fetching ${section} item`);
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
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'proficiency', label: 'Proficiency (%)', type: 'number', required: true },
          { name: 'icon', label: 'Icon Class', type: 'text', required: true },
        ];
      case 'education':
        return [
          { name: 'institution', label: 'Institution', type: 'text', required: true },
          { name: 'degree', label: 'Degree', type: 'text', required: true },
          { name: 'field', label: 'Field of Study', type: 'text', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'start_date', label: 'Start Date', type: 'date', required: true },
          { name: 'end_date', label: 'End Date', type: 'date' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'gpa', label: 'GPA', type: 'text' },
          { name: 'institution_logo', label: 'Institution Logo', type: 'image' },
        ];
      case 'certifications':
        return [
          { name: 'name', label: 'Certification Name', type: 'text', required: true },
          { name: 'organization', label: 'Issuing Organization', type: 'text', required: true },
          { name: 'issue_date', label: 'Issue Date', type: 'date', required: true },
          { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
          { name: 'credential_id', label: 'Credential ID', type: 'text' },
          { name: 'credential_url', label: 'Credential URL', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'organization_logo', label: 'Organization Logo', type: 'image' },
        ];
      case 'volunteering':
        return [
          { name: 'organization', label: 'Organization', type: 'text', required: true },
          { name: 'role', label: 'Role', type: 'text', required: true },
          { name: 'start_date', label: 'Start Date', type: 'date', required: true },
          { name: 'end_date', label: 'End Date', type: 'date' },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'organization_logo', label: 'Organization Logo', type: 'image' },
        ];
      case 'awards':
        return [
          { name: 'title', label: 'Award Title', type: 'text', required: true },
          { name: 'issuer', label: 'Issuer', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'issuer_logo', label: 'Issuer Logo', type: 'image' },
        ];
      case 'languages':
        return [
          { name: 'name', label: 'Language', type: 'text', required: true },
          { name: 'proficiency', label: 'Proficiency Level', type: 'select', required: true, options: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] },
        ];
      case 'organizations':
        return [
          { name: 'name', label: 'Organization Name', type: 'text', required: true },
          { name: 'role', label: 'Your Role', type: 'text', required: true },
          { name: 'start_date', label: 'Start Date', type: 'date', required: true },
          { name: 'end_date', label: 'End Date', type: 'date' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'organization_logo', label: 'Organization Logo', type: 'image' },
        ];
      default:
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
        ];
    }
  };
  
  const handleSuccess = () => {
    router.push(`/admin/${section}`);
  };
  
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={() => router.push(`/admin/${section}`)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to List
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit {section.charAt(0).toUpperCase() + section.slice(1)}</h1>
      {item && (
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
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}