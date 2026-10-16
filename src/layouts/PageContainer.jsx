import { cn } from "@/lib/utils";

/**
 * Centered, responsive content container used by every page for consistent
 * horizontal spacing and maximum line length.
 */
export function PageContainer({ className, children, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
