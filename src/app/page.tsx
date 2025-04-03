/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HomeSection from '@/components/sections/Home';
import AboutSection from '@/components/sections/About';
import ExperiencesSection from '@/components/sections/Experiences';
import ProjectsSection from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';
import EducationSection from '@/components/sections/Education';
import CertificationsSection from '@/components/sections/Certifications';
import VolunteeringSection from '@/components/sections/Volunteering';
import AwardsSection from '@/components/sections/Awards';
import LanguagesSection from '@/components/sections/Languages';
import OrganizationsSection from '@/components/sections/Organizations';
import ContactSection from '@/components/sections/Contact';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ThreeSceneWrapper from '@/components/3d/ThreeSceneWrapper';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ClientOnly from '@/components/ui/ClientOnly';

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section id="home" className="h-screen relative overflow-hidden">
        <ErrorBoundary fallback={<div className="h-screen flex items-center justify-center">Failed to load 3D scene</div>}>
          <ThreeSceneWrapper />
        </ErrorBoundary>
        <HomeSection />
      </section>
      
      <section id="about" className="py-20 section-primary">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AboutSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="experiences" className="py-20 section-alt">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ExperiencesSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="projects" className="py-20 section-primary">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectsSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="skills" className="py-20 section-alt">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <SkillsSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="education" className="py-20 section-primary">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <EducationSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="certifications" className="py-20 section-alt">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <CertificationsSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="awards" className="py-20 section-primary">
        <ErrorBoundary>
          <ClientOnly>
            <AwardsSection />
          </ClientOnly>
        </ErrorBoundary>
      </section>
      
      <section id="languages" className="py-20 section-alt">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <LanguagesSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <section id="organizations" className="py-20 section-primary">
        <ErrorBoundary>
          <ClientOnly>
            <OrganizationsSection />
          </ClientOnly>
        </ErrorBoundary>
      </section>
      
      <section id="volunteering" className="py-20 section-alt">
        <ErrorBoundary>
          <ClientOnly>
            <VolunteeringSection />
          </ClientOnly>
        </ErrorBoundary>
      </section>
      
      <section id="contact" className="py-20 section-primary">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      
      <Footer />
    </div>
  );
}
