'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SectionEditor from '@/components/admin/SectionEditor';

export default function AdminNewPage() {
  const params = useParams();
  const router = useRouter();
  
  const section = params.section as string;
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/admin');
        return;
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Define fields for each section (same as in edit page)
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
          { name: 'issuer', label: 'Issuing Organization', type: 'text', required: true },
          { name: 'date', label: 'Date Received', type: 'date', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'issuer_logo', label: 'Issuer Logo', type: 'image' },
        ];
      case 'languages':
        return [
          { name: 'name', label: 'Language Name', type: 'text', required: true },
          { name: 'proficiency', label: 'Proficiency Level', type: 'text', required: true },
          { name: 'order', label: 'Display Order', type: 'number', required: true },
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
  
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add New {sectionTitle}
        </h1>
        
        <SectionEditor
          tableName={section}
          initialData={{}}
          fields={getFields() as Array<{
            name: string;
            label: string;
            type: "number" | "text" | "textarea" | "image" | "date" | "tags" | "select" | "checkbox";
            options?: string[];
            required?: boolean;
          }>}
          onSuccess={() => router.push(`/admin/${section}`)}
        />
      </div>
    </div>
  );
}