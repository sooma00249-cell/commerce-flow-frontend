import { useTranslation } from "@/hooks/useTranslation";

/** Small metric strip highlighting foundation facts (not backend data). */
export function StatsStrip() {
  const { t } = useTranslation();

  const stats = [
    { label: t("home.stats.components"), value: "20+" },
    { label: t("home.stats.languages"), value: "2" },
    { label: t("home.stats.directions"), value: "RTL / LTR" },
    { label: t("home.stats.tokens"), value: "Design-token driven" },
  ];

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
