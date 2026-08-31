import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { Certification } from "@/db/schema";

interface CertificationsSectionProps {
  data: Certification[];
}

export function CertificationsSection({ data }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            title="Certifications"
            subtitle="Professional certifications and completed programs."
          />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((cert) => (
            <AnimatedItem key={cert.id}>
              <div className="bg-surface rounded-lg p-4 border border-neutral-300/30 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-on-surface text-sm leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-primary text-xs mt-0.5">{cert.issuer}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {cert.issueDate && (
                        <span className="text-neutral-500 text-xs">
                          Issued: {cert.issueDate}
                          {cert.expiryDate && ` · Expires: ${cert.expiryDate}`}
                        </span>
                      )}
                      {cert.credentialId && (
                        <span className="text-neutral-500 text-xs font-mono">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.name} certificate`}
                      className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-surface-variant transition-colors shrink-0"
                    >
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
