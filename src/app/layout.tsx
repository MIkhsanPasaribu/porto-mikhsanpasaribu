import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/ThemeContext';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'M. Ikhsan Pasaribu - Portfolio',
  description: 'Personal portfolio showcasing my projects, skills, and experience as a Full Stack Developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DevIcons for skill icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>
      <body className={`${inter.className} bg-sky-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
          <Analytics />
          
          {/* Fix for hydration mismatches caused by browser extensions */}
          <Script id="fix-hydration" strategy="beforeInteractive">
            {`
              (function() {
                // Remove attributes that might cause hydration mismatches
                if (typeof window !== 'undefined') {
                  const observer = new MutationObserver(function() {
                    if (document.body) {
                      const attributesToRemove = ['cz-shortcut-listen', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
                      attributesToRemove.forEach(attr => {
                        if (document.body.hasAttribute(attr)) {
                          document.body.removeAttribute(attr);
                        }
                      });
                      observer.disconnect();
                    }
                  });
                  
                  observer.observe(document.documentElement, { 
                    childList: true, 
                    subtree: true 
                  });
                }
              })();
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
