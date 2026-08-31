import Link from "next/link";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-variant border-t border-neutral-300/30 dark:border-neutral-300/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-on-surface font-semibold text-base mb-2">
              M. Ikhsan Pasaribu
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Backend AI Engineering Intern & Software Engineer building
              intelligent systems and scalable applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-on-surface font-semibold text-sm mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-on-surface font-semibold text-sm mb-3">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-neutral-500 text-sm">
                <MapPinIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Pekanbaru, Riau, Indonesia</span>
              </li>
              <li>
                <a
                  href="mailto:mikhsanpasaribu@gmail.com"
                  className="flex items-center gap-2 text-neutral-500 hover:text-primary text-sm transition-colors"
                >
                  <EnvelopeIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>mikhsanpasaribu@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6285271207118"
                  className="flex items-center gap-2 text-neutral-500 hover:text-primary text-sm transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>+62 852-7120-7118</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-neutral-300/30 dark:border-neutral-300/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-neutral-500 text-xs">
            © {currentYear} M. Ikhsan Pasaribu. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/mikhsanpasaribu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-300/50 text-neutral-500 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/MIkhsanPasaribu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-300/50 text-neutral-500 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
