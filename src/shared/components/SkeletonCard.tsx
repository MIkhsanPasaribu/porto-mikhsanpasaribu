import { cn } from "@/shared/utils/cn";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

// Skeleton shimmer animation untuk loading state cards
export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg p-4 border border-neutral-300/30 animate-pulse",
        className
      )}
    >
      <div className="h-4 bg-neutral-100 dark:bg-neutral-100/10 rounded w-3/4 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 bg-neutral-100 dark:bg-neutral-100/10 rounded mb-2",
            i === lines - 1 ? "w-1/2" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Skeleton untuk shimmer text inline
export function SkeletonText({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 bg-neutral-100 dark:bg-neutral-100/10 rounded animate-pulse",
        className
      )}
    />
  );
}
