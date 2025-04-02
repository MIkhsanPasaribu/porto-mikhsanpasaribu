/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleAuthError, supabase } from '@/lib/supabase';
import SectionList from '@/components/admin/SectionList';

export default function AdminSectionPage() {
  const params = useParams();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const section = params.section as string;
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          // Handle auth error and redirect if needed
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
    const fetchItems = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from(section)
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        setItems(data || []);
      } catch (err: any) {
        setError(err.message || `Error fetching ${section}`);
      } finally {
        setLoading(false);
      }
    };
    
    if (section) {
      fetchItems();
    }
  }, [section]);
  
  // Define columns for each section
  const getColumns = () => {
    switch (section) {
      case 'about':
        return [
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { 
            key: 'description', 
            label: 'Description',
            render: (value: string) => (
              <div className="text-sm text-gray-900 truncate max-w-xs">
                {value?.substring(0, 100)}...
              </div>
            )
          },
        ];
      case 'experiences':
        return [
          { key: 'id', label: 'ID' },
          { key: 'company', label: 'Company' },
          { key: 'position', label: 'Position' },
          { 
            key: 'start_date', 
            label: 'Start Date',
            render: (value: string | number | Date) => (
              <div className="text-sm text-gray-900">
                {new Date(value).toLocaleDateString()}
              </div>
            )
          },
        ];
      case 'projects':
        return [
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { 
            key: 'technologies', 
            label: 'Technologies',
            render: (value: string | number | bigint | boolean | any[] | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
              <div className="text-sm text-gray-900">
                {Array.isArray(value) ? value.join(', ') : value}
              </div>
            )
          },
        ];
      case 'skills':
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          { 
            key: 'proficiency', 
            label: 'Proficiency',
            render: (value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
              <div className="text-sm text-gray-900">
                {value}%
              </div>
            )
          },
        ];
      case 'education':
        return [
          { key: 'id', label: 'ID' },
          { key: 'institution', label: 'Institution' },
          { key: 'degree', label: 'Degree' },
          { key: 'field', label: 'Field' },
        ];
      case 'certifications':
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'organization', label: 'Organization' },
          { 
            key: 'issue_date', 
            label: 'Issue Date',
            render: (value: string | number | Date) => (
              <div className="text-sm text-gray-900">
                {new Date(value).toLocaleDateString()}
              </div>
            )
          },
        ];
      case 'volunteering':
        return [
          { key: 'id', label: 'ID' },
          { key: 'organization', label: 'Organization' },
          { key: 'role', label: 'Role' },
        ];
      case 'awards':
        return [
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { key: 'issuer', label: 'Issuer' },
          { 
            key: 'date', 
            label: 'Date',
            render: (value: string | number | Date) => (
              <div className="text-sm text-gray-900">
                {new Date(value).toLocaleDateString()}
              </div>
            )
          },
        ];
      case 'languages':
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Language' },
          { key: 'proficiency', label: 'Proficiency' },
        ];
      case 'organizations':
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Organization' },
          { key: 'role', label: 'Role' },
        ];
      case 'contacts':
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { 
            key: 'created_at', 
            label: 'Date',
            render: (value: string | number | Date) => (
              <div className="text-sm text-gray-900">
                {new Date(value).toLocaleDateString()}
              </div>
            )
          },
        ];
      default:
        return [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
        ];
    }
  };
  
  const refreshData = () => {
    router.refresh();
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{sectionTitle}</h1>
          
          {section !== 'contacts' && (
            <Link
              href={`/admin/${section}/new`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add New
            </Link>
          )}
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <SectionList
          tableName={section}
          items={items}
          columns={getColumns()}
          onDelete={refreshData}
        />
      </div>
    </div>
  );
}