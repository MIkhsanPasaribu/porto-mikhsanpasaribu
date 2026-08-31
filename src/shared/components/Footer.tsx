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
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/mikhsanpasaribu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-primary text-xs transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MIkhsanPasaribu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-primary text-xs transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
