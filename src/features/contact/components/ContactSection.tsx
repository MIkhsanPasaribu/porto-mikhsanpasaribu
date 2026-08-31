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
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/MIkhsanPasaribu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm hover:border-primary hover:text-primary transition-colors"
                >
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
