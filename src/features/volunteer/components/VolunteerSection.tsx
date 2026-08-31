import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { VolunteerActivity } from "@/db/schema";

interface VolunteerSectionProps {
  data: VolunteerActivity[];
}

export function VolunteerSection({ data }: VolunteerSectionProps) {
  return (
    <section id="volunteer" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader title="Volunteer & Community" />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((vol) => (
            <AnimatedItem key={vol.id}>
              <div className="bg-surface rounded-lg p-4 border border-neutral-300/30 hover:shadow-md transition-shadow flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <HeartIcon className="w-5 h-5 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface text-sm">{vol.role}</h3>
                  <p className="text-primary text-xs mt-0.5">{vol.organization}</p>
                  {(vol.startDate || vol.endDate) && (
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {vol.startDate}{vol.endDate && vol.endDate !== vol.startDate ? ` — ${vol.endDate}` : ""}
                    </p>
                  )}
                  {vol.description && (
                    <p className="text-neutral-700 text-xs mt-1.5 leading-relaxed">{vol.description}</p>
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
