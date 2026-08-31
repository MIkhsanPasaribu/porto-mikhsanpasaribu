import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// Font utama — sesuai DESIGN.md typography
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Font monospace — sesuai DESIGN.md mono-code
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "M. Ikhsan Pasaribu — Software Engineer & AI Developer",
    template: "%s | M. Ikhsan Pasaribu",
  },
  description:
    "Portfolio of M. Ikhsan Pasaribu — Backend AI Engineering Intern, Software Engineer, and AI/ML enthusiast based in Pekanbaru, Indonesia.",
  keywords: [
    "M. Ikhsan Pasaribu",
    "Software Engineer",
    "AI Developer",
    "Next.js",
    "LangChain",
    "Portfolio",
  ],
  authors: [{ name: "M. Ikhsan Pasaribu", url: "https://mikhsanpasaribu.vercel.app" }],
  creator: "M. Ikhsan Pasaribu",
  metadataBase: new URL("https://mikhsanpasaribu.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mikhsanpasaribu.vercel.app",
    siteName: "M. Ikhsan Pasaribu",
    title: "M. Ikhsan Pasaribu — Software Engineer & AI Developer",
    description:
      "Portfolio of M. Ikhsan Pasaribu — Backend AI Engineering Intern, Software Engineer, and AI/ML enthusiast.",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Ikhsan Pasaribu — Software Engineer & AI Developer",
    description: "Portfolio of M. Ikhsan Pasaribu.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
