import { cn } from "@/lib/utils";

/**
 * A titled block within the design-system gallery. Provides consistent spacing
 * and an anchor id so sections can be linked to directly.
 */
export function DesignSection({ id, title, children, className }) {
  return (
    <section id={id} className={cn("scroll-mt-24 space-y-5", className)}>
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
