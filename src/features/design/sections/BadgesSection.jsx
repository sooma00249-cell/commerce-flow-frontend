import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

/** Badge variant preview. */
export function BadgesSection() {
  const { t } = useTranslation();

  const badges = [
    { variant: "default", label: t("badgesDemo.default") },
    { variant: "secondary", label: t("badgesDemo.secondary") },
    { variant: "outline", label: t("badgesDemo.outline") },
    { variant: "success", label: t("badgesDemo.success") },
    { variant: "warning", label: t("badgesDemo.warning") },
    { variant: "destructive", label: t("badgesDemo.destructive") },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {badges.map((badge) => (
        <Badge key={badge.variant} variant={badge.variant}>
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}
