/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/ThemeContext';

interface Column {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface SectionListProps {
  tableName: string;
  items: any[];
  columns: Column[];
  onDelete: () => void;
}

export default function SectionList({ tableName, items, columns, onDelete }: SectionListProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', itemToDelete);
      
      if (error) throw error;
      
      onDelete();
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <div className={`overflow-x-auto rounded-lg ${
        isDarkMode ? 'bg-[#0A0A0A] border border-[#146C94]/30' : 'bg-white shadow'
      }`}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-[#146C94]/30">
          <thead className={isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50'}>
            <tr>
              {columns.map((column) => (
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
                  colSpan={columns.length + 1} 
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
                  {columns.map((column) => (
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
                        href={`/admin/${tableName}/edit/${item.id}`}
                        className={`${
                          isDarkMode 
                            ? 'text-[#19A7CE] hover:text-[#F6F1F1]' 
                            : 'text-[#0B409C] hover:text-[#10316B]'
                        }`}
                        prefetch={false}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full ${
            isDarkMode ? 'bg-[#0A0A0A] border border-[#146C94]/30' : 'bg-white shadow-xl'
          }`}>
            <h3 className={`text-lg font-medium mb-4 ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              Confirm Deletion
            </h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-[#F6F1F1]/80' : 'text-gray-600'
            }`}>
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-[#0A0A0A] border border-[#146C94]/30 text-[#F6F1F1] hover:bg-[#146C94]/10' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}