/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  const isDarkMode = theme === 'dark';
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);
  
  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };
  
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Projects', href: '/admin/projects', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Experiences', href: '/admin/experiences', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Skills', href: '/admin/skills', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Education', href: '/admin/education', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
    { name: 'Certifications', href: '/admin/certifications', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Awards', href: '/admin/awards', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Languages', href: '/admin/languages', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
    { name: 'Organizations', href: '/admin/organizations', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Volunteering', href: '/admin/volunteering', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { name: 'Contact Messages', href: '/admin/contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
  
  // Update the sidebar and main content colors
  return (
    <div className={`min-h-screen flex overflow-hidden ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      {/* Sidebar for desktop */}
      <div className={`hidden md:flex md:flex-shrink-0`}>
        <div className={`flex flex-col w-64 ${
          isDarkMode 
            ? 'bg-[#0A0A0A] border-r border-[#146C94]/30' 
            : 'bg-white border-r border-[#0B409C]/10'
        }`}>
          {/* Sidebar content */}
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-[#146C94]/30">
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
                Portfolio Admin
              </h1>
            </div>
            
            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? isDarkMode 
                            ? 'bg-[#146C94]/20 text-[#19A7CE]' 
                            : 'bg-[#0B409C]/10 text-[#0B409C]'
                          : isDarkMode 
                            ? 'text-[#F6F1F1]/70 hover:bg-[#146C94]/10 hover:text-[#19A7CE]' 
                            : 'text-[#10316B]/70 hover:bg-[#0B409C]/5 hover:text-[#0B409C]'
                      }`}
                    >
                      <svg
                        className={`mr-3 h-5 w-5 ${
                          isActive
                            ? isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'
                            : isDarkMode ? 'text-[#F6F1F1]/50' : 'text-[#10316B]/50'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            {/* Logout button */}
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-[#146C94]/30 p-4">
              <button
                onClick={handleLogout}
                className={`flex-shrink-0 w-full group block ${
                  isDarkMode ? 'hover:bg-[#146C94]/10' : 'hover:bg-[#0B409C]/5'
                } p-2 rounded-md`}
              >
                <div className="flex items-center">
                  <div>
                    <svg 
                      className={`h-5 w-5 ${isDarkMode ? 'text-[#F6F1F1]/70' : 'text-[#10316B]/70'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>
                      Logout
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 flex z-40 md:hidden transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className={`relative flex-1 flex flex-col max-w-xs w-full ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={`flex-1 h-0 pt-5 pb-4 overflow-y-auto ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
            <div className="flex-shrink-0 flex items-center px-4">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`}>
                Portfolio Admin
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#146C94]/20 text-[#19A7CE]'
                          : 'bg-[#0B409C]/10 text-[#0B409C]'
                        : isDarkMode
                          ? 'text-[#F6F1F1]/70 hover:bg-[#146C94]/10 hover:text-[#F6F1F1]'
                          : 'text-[#10316B]/70 hover:bg-[#0B409C]/5 hover:text-[#10316B]'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <svg
                      className={`mr-4 h-6 w-6 ${
                        isActive
                          ? isDarkMode
                            ? 'text-[#19A7CE]'
                            : 'text-[#0B409C]'
                          : isDarkMode
                            ? 'text-[#F6F1F1]/50'
                            : 'text-[#10316B]/50'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className={`flex-shrink-0 flex border-t p-4 ${isDarkMode ? 'border-[#146C94]/20' : 'border-[#0B409C]/10'}`}>
            <button
              onClick={handleLogout}
              className={`flex-shrink-0 group block w-full flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isDarkMode
                  ? 'text-[#F6F1F1]/70 hover:bg-[#146C94]/10 hover:text-[#F6F1F1]'
                  : 'text-[#10316B]/70 hover:bg-[#0B409C]/5 hover:text-[#10316B]'
              }`}
            >
              <svg
                className={`mr-4 h-6 w-6 ${isDarkMode ? 'text-[#F6F1F1]/50' : 'text-[#10316B]/50'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
      
      {/* Mobile top bar */}
      <div className="md:hidden">
        <div className={`fixed top-0 left-0 right-0 z-30 flex items-center h-16 px-4 ${
          isDarkMode ? 'bg-[#0A0A0A] border-b border-[#146C94]/20' : 'bg-white border-b border-[#0B409C]/10'
        }`}>
          <button
            type="button"
            className={`-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md ${
              isDarkMode ? 'text-[#F6F1F1]/70 hover:text-[#F6F1F1]' : 'text-[#10316B]/70 hover:text-[#10316B]'
            }`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`}>
              Portfolio Admin
            </span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="md:py-6 md:px-8 pt-16 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}