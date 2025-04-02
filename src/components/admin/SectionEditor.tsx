/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

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
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [name]: value }));
    }
  };
  
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
        .from('public')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage.from('public').getPublicUrl(filePath);
      
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Data saved successfully!
        </div>
      )}
      
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="mr-2 leading-tight"
                />
              )}
              
              {field.type === 'select' && field.options && (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <div>
                  <input
                    type="text"
                    id={field.name}
                    value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : ''}
                    onChange={(e) => handleTagsChange(field.name, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter comma-separated values"
                    required={field.required}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter comma-separated values</p>
                </div>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}