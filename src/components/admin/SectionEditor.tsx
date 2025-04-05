/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import TagInput from './TagInput';
import { useTheme } from '@/lib/ThemeContext';

interface SectionEditorProps {
  tableName: string;
  initialData: any;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'date' | 'checkbox' | 'select' | 'tags' | 'image';
    options?: string[];
    required?: boolean;
  }[];
  onSuccess?: () => void;
}

export default function SectionEditor({ tableName, initialData, fields, onSuccess }: SectionEditorProps) {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [name]: value }));
    }
  };
  
  // Modified to actually use this function for tags input
  const handleTagsChange = (name: string, value: string) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData((prev: Record<string, unknown>) => ({ ...prev, [name]: tagsArray }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${tableName}/${fileName}`;
      
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);
        
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [fieldName]: data.publicUrl }));
    } catch (err: any) {
      setError(`Error uploading image: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      let result;
      
      if (initialData?.id) {
        // Update existing record
        const { data, error } = await supabase
          .from(tableName)
          .update(formData)
          .eq('id', initialData.id)
          .select();
        
        if (error) throw error;
        result = data;
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from(tableName)
          .insert([formData])
          .select();
        
        if (error) throw error;
        result = data;
      }
      
      setSuccess(true);
      if (onSuccess) onSuccess();
      
      // Refresh the page after a short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving data');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`p-6 rounded-lg ${
      isDarkMode 
        ? 'bg-[#0A0A0A] border border-[#146C94]/30' 
        : 'bg-white shadow-md'
    }`}>
      {success && (
        <div className={`mb-6 px-4 py-3 rounded ${
          isDarkMode 
            ? 'bg-[#146C94]/20 border border-[#19A7CE]/30 text-[#19A7CE]' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          Data saved successfully!
        </div>
      )}
      
      {error && (
        <div className={`mb-6 px-4 py-3 rounded ${
          isDarkMode 
            ? 'bg-red-900/20 border border-red-500/30 text-red-400' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className={`block text-sm font-bold mb-2 ${
                isDarkMode ? 'text-[#F6F1F1]' : 'text-gray-700'
              }`} htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:shadow-outline-blue' 
                      : 'bg-white border-gray-300 text-gray-700 focus:border-[#0B409C] focus:shadow-outline'
                  }`}
                  required={field.required}
                />
              )}
              
              {field.type === 'textarea' && (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  rows={5}
                  className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:shadow-outline-blue' 
                      : 'bg-white border-gray-300 text-gray-700 focus:border-[#0B409C] focus:shadow-outline'
                  }`}
                  required={field.required}
                ></textarea>
              )}
              
              {field.type === 'number' && (
                <input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:shadow-outline-blue' 
                      : 'bg-white border-gray-300 text-gray-700 focus:border-[#0B409C] focus:shadow-outline'
                  }`}
                  required={field.required}
                />
              )}
              
              {field.type === 'date' && (
                <input
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:shadow-outline-blue' 
                      : 'bg-white border-gray-300 text-gray-700 focus:border-[#0B409C] focus:shadow-outline'
                  }`}
                  required={field.required}
                />
              )}
              
              {field.type === 'checkbox' && (
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                  className={`mr-2 leading-tight ${
                    isDarkMode ? 'accent-[#19A7CE]' : 'accent-[#0B409C]'
                  }`}
                />
              )}
              
              {field.type === 'select' && field.options && (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] focus:border-[#19A7CE] focus:shadow-outline-blue' 
                      : 'bg-white border-gray-300 text-gray-700 focus:border-[#0B409C] focus:shadow-outline'
                  }`}
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              
              {field.type === 'tags' && (
                <TagInput
                  value={formData[field.name] || ''}
                  onChange={(value) => handleTagsChange(field.name, value)}
                  placeholder={`Add ${field.label.toLowerCase()}...`}
                  className={`w-full ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1]' 
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                />
              )}
              
              {field.type === 'image' && (
                <div>
                  {formData[field.name] && (
                    <div className="mb-2">
                      <img 
                        src={formData[field.name]} 
                        alt="Preview" 
                        className="h-32 object-contain"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id={field.name}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, field.name)}
                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                      isDarkMode 
                        ? 'bg-[#0A0A0A] border-[#146C94]/30 text-[#F6F1F1] file:bg-[#146C94]/20 file:text-[#19A7CE] file:border-[#146C94]/30' 
                        : 'bg-white border-gray-300 text-gray-700 file:bg-[#0B409C]/10 file:text-[#0B409C] file:border-[#0B409C]/20'
                    } file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className={`mr-4 px-4 py-2 border rounded-md ${
              isDarkMode
                ? 'border-[#146C94]/30 text-[#F6F1F1] hover:bg-[#146C94]/10'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isDarkMode
                ? 'bg-[#19A7CE] hover:bg-[#146C94] focus:ring-[#146C94]'
                : 'bg-[#0B409C] hover:bg-[#10316B] focus:ring-[#0B409C]'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}