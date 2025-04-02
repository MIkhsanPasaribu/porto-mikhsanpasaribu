/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Suspense } from 'react';
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section id="home" className="h-screen relative">
        <ThreeSceneWrapper />
        <HomeSection />
      </section>
      
      <section id="about" className="py-20 section-primary">
        <AboutSection />
      </section>
      
      <section id="experiences" className="py-20 section-alt">
        <ExperiencesSection />
      </section>
      
      <section id="projects" className="py-20 section-primary">
        <ProjectsSection />
      </section>
      
      <section id="skills" className="py-20 section-alt">
        <SkillsSection />
      </section>
      
      <section id="education" className="py-20 section-primary">
        <EducationSection />
      </section>
      
      <section id="certifications" className="py-20 section-alt">
        <CertificationsSection />
      </section>
      
      <section id="awards" className="py-20 section-primary">
        <AwardsSection />
      </section>
      
      <section id="languages" className="py-20 section-alt">
        <LanguagesSection />
      </section>
      
      <section id="organizations" className="py-20 section-primary">
        <OrganizationsSection />
      </section>
      
      <section id="volunteering" className="py-20 section-alt">
        <VolunteeringSection />
      </section>
      
      <section id="contact" className="py-20 section-primary">
        <ContactSection />
      </section>
      
      <Footer />
    </div>
  );
}
