import { useTranslation } from "@/hooks/useTranslation";

/** Swatches for the semantic color tokens defined in index.css. */
export function ColorTokens() {
  const { t } = useTranslation();

  const swatches = [
    { name: t("design.colorPrimary"), className: "bg-primary" },
    { name: t("design.colorSecondary"), className: "bg-secondary" },
    { name: t("design.colorMuted"), className: "bg-muted" },
    { name: t("design.colorAccent"), className: "bg-accent" },
    { name: t("design.colorDestructive"), className: "bg-destructive" },
    { name: t("design.colorSuccess"), className: "bg-success" },
    { name: t("design.colorWarning"), className: "bg-warning" },
    { name: t("design.colorSurface"), className: "bg-card border border-border" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {swatches.map((swatch) => (
        <div key={swatch.name} className="space-y-2">
          <div className={`h-16 w-full rounded-md ${swatch.className}`} />
          <div className="text-sm font-medium text-foreground">{swatch.name}</div>
        </div>
      ))}
    </div>
  );
}
