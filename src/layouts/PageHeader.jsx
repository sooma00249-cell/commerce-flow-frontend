import { cn } from "@/lib/utils";

/**
 * Page title block: heading, optional description, and optional actions.
 * Rendered with logical alignment so it works in RTL and LTR.
 */
export function PageHeader({ title, description, actions, className, as: Heading = "h1" }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <Heading className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </Heading>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
