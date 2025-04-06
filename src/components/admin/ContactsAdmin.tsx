import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { useTheme } from '@/lib/ThemeContext';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching contacts:', error);
          setError(true);
          throw error;
        }
        
        if (data) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error('Error in contacts fetch:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
    
    // Set up real-time subscription
    const contactsSubscription = supabase
      .channel('contacts-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contacts' }, 
        () => {
          console.log('Contacts data changed, refreshing...');
          fetchContacts();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(contactsSubscription);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDarkMode ? 'border-[#19A7CE]' : 'border-[#0B409C]'
        }`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Error loading contacts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
      }`}>Contact Messages</h2>
      
      {contacts.length === 0 ? (
        <div className={`text-center py-10 rounded-lg ${
          isDarkMode 
            ? 'bg-[#0A0A0A] border border-[#146C94]/20 text-[#F6F1F1]/70' 
            : 'bg-white border border-[#0B409C]/10 text-[#10316B]/70'
        }`}>
          <p>No contact messages found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className={`min-w-full rounded-lg overflow-hidden ${
            isDarkMode ? 'bg-[#0A0A0A] border border-[#146C94]/30' : 'bg-white border border-[#0B409C]/10'
          }`}>
            <thead className={`${
              isDarkMode ? 'bg-[#146C94]/20' : 'bg-[#0B409C]/5'
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                }`}>Name</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                }`}>Email</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                }`}>Subject</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                }`}>Message</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                }`}>Date</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDarkMode ? 'divide-[#146C94]/20' : 'divide-[#0B409C]/10'
            }`}>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-opacity-50">
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'
                  }`}>{contact.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>{contact.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>{contact.subject || '-'}</td>
                  <td className={`px-6 py-4 text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {contact.message.length > 100 
                        ? `${contact.message.substring(0, 100)}...` 
                        : contact.message}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-[#F6F1F1]/80' : 'text-[#10316B]/80'
                  }`}>
                    {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}