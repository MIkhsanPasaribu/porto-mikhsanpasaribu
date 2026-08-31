"use client";

import { useState } from "react";
import { AnimatedSection } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = "Invalid email address";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("sending");

    // Buka mailto link sebagai fallback sederhana
    const subject = encodeURIComponent(formState.subject || "Contact from Portfolio");
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:mikhsanpasaribu@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Contact"
            subtitle="Have a project in mind or want to collaborate? Let's connect."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <AnimatedSection>
            <div className="space-y-6">
              <p className="text-neutral-700 text-base leading-relaxed">
                I'm currently open to Backend AI Engineering internships, Software
                Engineering roles, and collaboration on interesting projects. Feel free
                to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:mikhsanpasaribu@gmail.com"
                  className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-sm font-medium">mikhsanpasaribu@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+6285271207118"
                  className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <p className="text-sm font-medium">+62 852-7120-7118</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-neutral-700">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Location</p>
                    <p className="text-sm font-medium">Pekanbaru, Riau, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://linkedin.com/in/mikhsanpasaribu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/MIkhsanPasaribu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-1">
                    Name <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-surface text-on-surface text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-error">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-1">
                    Email <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-surface text-on-surface text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-error">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-on-surface mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-surface text-on-surface text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-on-surface mb-1">
                  Message <span className="text-error" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-surface text-on-surface text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project or just say hi!"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-error">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="w-4 h-4" aria-hidden="true" />
                {status === "sending" ? "Opening mail..." : status === "sent" ? "Sent!" : "Send Message"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
