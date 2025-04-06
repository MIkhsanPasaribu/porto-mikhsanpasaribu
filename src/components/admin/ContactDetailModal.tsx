import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { format } from 'date-fns';
import { FaTimes } from 'react-icons/fa';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

interface ContactDetailModalProps {
  contact: Contact | null;
  onClose: () => void;
}

export default function ContactDetailModal({ contact, onClose }: ContactDetailModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className={`relative w-full max-w-2xl rounded-lg shadow-lg p-6 ${
          isDarkMode ? 'bg-[#0A0A0A] border border-[#146C94]/30' : 'bg-white border border-[#0B409C]/10'
        }`}
      >
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode 
              ? 'bg-[#146C94]/20 text-[#19A7CE] hover:bg-[#146C94]/40' 
              : 'bg-[#0B409C]/10 text-[#0B409C] hover:bg-[#0B409C]/20'
          }`}
        >
          <FaTimes />
        </button>
        
        <h2 className={`text-2xl font-bold mb-6 pr-8 ${
          isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
        }`}>
          Message Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              From
            </h3>
            <p className={`text-lg font-medium ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              {contact.name} ({contact.email})
            </p>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              Subject
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              {contact.subject || '-'}
            </p>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              Date
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
            }`}>
              {format(new Date(contact.created_at), 'MMMM d, yyyy h:mm a')}
            </p>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'
            }`}>
              Message
            </h3>
            <div className={`mt-2 p-4 rounded-md whitespace-pre-wrap ${
              isDarkMode ? 'bg-[#1A1A1A] text-[#F6F1F1]' : 'bg-[#F8FAFF] text-[#10316B]'
            }`}>
              {contact.message}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-[#146C94]/20 text-[#F6F1F1] hover:bg-[#146C94]/40' 
                : 'bg-[#0B409C]/10 text-[#10316B] hover:bg-[#0B409C]/20'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}