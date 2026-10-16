import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names conditionally and de-duplicate conflicting Tailwind classes.
 * Standard shadcn/ui helper used by every UI component.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
