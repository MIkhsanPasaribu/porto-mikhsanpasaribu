'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
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
  
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'home' },
    { name: 'Projects', href: '/admin/projects', icon: 'code' },
    { name: 'Experience', href: '/admin/experience', icon: 'briefcase' },
    { name: 'Skills', href: '/admin/skills', icon: 'star' },
    { name: 'Education', href: '/admin/education', icon: 'academic-cap' },
    { name: 'Settings', href: '/admin/settings', icon: 'cog' },
  ];
  
  return (
    <div className={`h-screen flex overflow-hidden ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F2F7FF]'}`}>
      {/* Mobile sidebar */}
      <div className={`md:hidden ${isSidebarOpen ? 'fixed inset-0 flex z-40' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
        
        <div ref={sidebarRef} className={`relative flex-1 flex flex-col max-w-xs w-full ${isDarkMode ? 'bg-[#0A0A0A] border-r border-[#146C94]' : 'bg-[#F2F7FF] border-r border-[#0B409C]/20'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`}>Admin Dashboard</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isDarkMode 
                      ? 'text-[#F6F1F1] hover:bg-[#146C94] hover:text-[#19A7CE]' 
                      : 'text-[#10316B] hover:bg-[#FDBE34]/20 hover:text-[#0B409C]'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className={`flex flex-col h-0 flex-1 ${isDarkMode ? 'bg-[#0A0A0A] border-r border-[#146C94]' : 'bg-[#F2F7FF] border-r border-[#0B409C]/20'}`}>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`}>Admin Dashboard</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isDarkMode 
                        ? 'text-[#F6F1F1] hover:bg-[#146C94] hover:text-[#19A7CE]' 
                        : 'text-[#10316B] hover:bg-[#FDBE34]/20 hover:text-[#0B409C]'
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className={`flex-shrink-0 flex border-t p-4 ${isDarkMode ? 'border-[#146C94]' : 'border-[#0B409C]/20'}`}>
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className={`inline-block h-9 w-9 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#146C94]' : 'bg-[#0B409C]'}`}>
                      <svg className="h-full w-full text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`}>Admin User</p>
                    <p className={`text-xs ${isDarkMode ? 'text-[#19A7CE]' : 'text-[#0B409C]'}`}>View profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className={`relative z-10 flex-shrink-0 flex h-16 ${isDarkMode ? 'bg-[#000000] border-b border-[#146C94]' : 'bg-[#F2F7FF] border-b border-[#0B409C]/20'} shadow-sm`}>
          <button
            className={`px-4 border-r md:hidden ${isDarkMode ? 'border-[#146C94]' : 'border-[#0B409C]/20'}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className={`h-6 w-6 ${isDarkMode ? 'text-[#F6F1F1]' : 'text-[#10316B]'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">Search</label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${isDarkMode ? 'text-[#146C94]' : 'text-[#0B409C]/50'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="search-field"
                    className={`block w-full h-full pl-8 pr-3 py-2 rounded-md text-sm ${
                      isDarkMode 
                        ? 'bg-[#0A0A0A] text-[#F6F1F1] placeholder-[#146C94] border-transparent focus:border-[#19A7CE] focus:ring-0' 
                        : 'bg-[#F2F7FF] text-[#10316B] placeholder-[#0B409C]/50 border-transparent focus:border-[#0B409C] focus:ring-0'
                    }`}
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                className={`p-1 rounded-full ${
                  isDarkMode 
                    ? 'text-[#F6F1F1] hover:text-[#19A7CE] focus:outline-none focus:ring-2 focus:ring-[#146C94]' 
                    : 'text-[#10316B] hover:text-[#0B409C] focus:outline-none focus:ring-2 focus:ring-[#0B409C]'
                }`}
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}