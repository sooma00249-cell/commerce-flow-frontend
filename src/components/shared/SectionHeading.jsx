import { cn } from "@/lib/utils";

/** Centered or start-aligned section heading used across content sections. */
export function SectionHeading({ title, description, align = "start", className }) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
