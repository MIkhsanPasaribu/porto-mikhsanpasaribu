import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility untuk menggabungkan class Tailwind dengan deduplication
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
