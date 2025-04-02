/* eslint-disable @typescript-eslint/no-unused-vars */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

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
        {/* Suppress hydration warnings */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.attributeName === 'cz-shortcut-listen') {
                        var body = document.body;
                        if (body.hasAttribute('cz-shortcut-listen')) {
                          body.removeAttribute('cz-shortcut-listen');
                        }
                      }
                    });
                  });
                  
                  observer.observe(document.body, { 
                    attributes: true,
                    attributeFilter: ['cz-shortcut-listen']
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
