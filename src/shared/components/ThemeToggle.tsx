"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hindari hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-100/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md text-neutral-700 dark:text-neutral-700 hover:text-primary hover:bg-surface-variant dark:hover:bg-surface-variant transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </button>
  );
}
