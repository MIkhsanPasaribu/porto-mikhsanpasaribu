# Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Supabase.

## Features

- Responsive design that works on all devices
- Dynamic content management with Supabase backend
- Admin panel to manage all content
- Sections for projects, skills, experience, education, and more
- Contact form with email notifications
- Dark/light mode toggle
- Animations with Framer Motion
- SEO optimized

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Animation**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:

   ```bash
    npm install
    # or
    yarn install
   ```

3. Create a .env.local file in the root directory with your Supabase credentials:

   ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:

   ```bash
    npm run dev
    # or
    yarn dev
   ```

5. Open http://localhost:3000 in your browser to see the result.

### Setting up Supabase

1. Create a new Supabase project
2. Run the SQL queries in supabase/schema.sql to set up your database tables
3. Set up authentication (Email/Password)
4. Create a storage bucket named 'public' for storing images

## Deployment

The easiest way to deploy this app is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your environment variables
4. Deploy!

## Admin Access

To access the admin panel:

1. Navigate to /admin
2. Log in with your Supabase credentials
3. Manage your portfolio content

## License

This project is licensed under the MIT License - see the LICENSE file for details.
