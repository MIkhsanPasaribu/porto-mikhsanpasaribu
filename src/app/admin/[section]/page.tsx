/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleAuthError, supabase } from '@/lib/supabase';
import SectionList from '@/components/admin/SectionList';
import { useTheme } from '@/lib/ThemeContext';

export default function AdminSectionPage() {
  const params = useParams();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
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
              <div className={`text-sm truncate max-w-xs ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
              <div className={`text-sm ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
              }`}>
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
      <div className={`flex justify-center items-center h-40 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }
  
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
  
  return (
    <div className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      <div className={`px-4 py-6 sm:px-0 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
            {sectionTitle}
          </h1>
          
          {section !== 'contacts' && (
            <Link
              href={`/admin/${section}/new`}
              className={`px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-[#19A7CE] hover:bg-[#146C94] text-white' 
                  : 'bg-[#0B409C] hover:bg-[#10316B] text-white'
              }`}
            >
              Add New
            </Link>
          )}
        </div>
        
        {error && (
          <div className={`mb-6 px-4 py-3 rounded ${
            isDarkMode 
              ? 'bg-red-900/20 border border-red-500/30 text-red-400' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {error}
          </div>
        )}
        
        <div className={`rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-[#0A0A0A] border border-[#146C94]/30' : 'bg-white shadow'
        }`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-[#146C94]/30">
            <thead className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50'}>
              <tr>
                {getColumns().map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-500'
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-[#146C94]/30 ${
              isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'
            }`}>
              {items.length === 0 ? (
                <tr>
                  <td 
                    colSpan={getColumns().length + 1} 
                    className={`px-6 py-12 text-center ${
                      isDarkMode ? 'text-[#F6F1F1]/70' : 'text-gray-500'
                    }`}
                  >
                    No items found. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className={isDarkMode ? 'hover:bg-[#146C94]/10' : 'hover:bg-gray-50'}>
                    {getColumns().map((column) => (
                      <td 
                        key={`${item.id}-${column.key}`} 
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-900'
                        }`}
                      >
                        {column.render ? column.render(item[column.key]) : item[column.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          href={`/admin/${section}/${item.id}`}
                          className={`${
                            isDarkMode 
                              ? 'text-[#19A7CE] hover:text-[#F6F1F1]' 
                              : 'text-[#0B409C] hover:text-[#10316B]'
                          }`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                              supabase
                                .from(section)
                                .delete()
                                .eq('id', item.id)
                                .then(() => {
                                  refreshData();
                                });
                            }
                          }}
                          className={`${
                            isDarkMode 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-red-600 hover:text-red-900'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}