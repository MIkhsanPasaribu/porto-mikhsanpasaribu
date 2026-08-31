import { cn } from "@/shared/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2">{title}</h2>
      {subtitle && (
        <p className="text-neutral-500 text-base max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-3 h-1 w-12 rounded-full bg-primary" />
    </div>
  );
}
