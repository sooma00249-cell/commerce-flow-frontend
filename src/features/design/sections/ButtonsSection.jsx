import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

/** Button variant, size, and state preview. */
export function ButtonsSection() {
  const { t } = useTranslation();

  const variants = [
    { key: "primary", label: t("buttonsDemo.primary") },
    { key: "secondary", label: t("buttonsDemo.secondary") },
    { key: "outline", label: t("buttonsDemo.outline") },
    { key: "ghost", label: t("buttonsDemo.ghost") },
    { key: "destructive", label: t("buttonsDemo.destructive") },
    { key: "link", label: t("buttonsDemo.link") },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">Variants</div>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant.key} variant={variant.key}>
              {variant.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          {t("buttonsDemo.sizes")}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">{t("buttonsDemo.small")}</Button>
          <Button size="md">{t("buttonsDemo.medium")}</Button>
          <Button size="lg">{t("buttonsDemo.large")}</Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          {t("buttonsDemo.withIcon")}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Plus className="size-4" aria-hidden="true" />
            {t("form.submit")}
          </Button>
          <Button variant="outline">
            <Trash2 className="size-4" aria-hidden="true" />
            {t("buttonsDemo.destructive")}
          </Button>
          <Button disabled>{t("buttonsDemo.disabled")}</Button>
        </div>
      </div>
    </div>
  );
}
