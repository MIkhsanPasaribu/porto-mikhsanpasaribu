'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface SectionListProps {
  tableName: string;
  items: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  onDelete?: () => void;
}

export default function SectionList({ tableName, items, columns, onDelete }: SectionListProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      if (onDelete) onDelete();
      
      // Refresh the page
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the item');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? (
                        column.render(item[column.key], item)
                      ) : (
                        <div className="text-sm text-gray-900">
                          {typeof item[column.key] === 'object' 
                            ? JSON.stringify(item[column.key]) 
                            : String(item[column.key] || '')}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/${tableName}/edit/${item.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}