import { Boxes, ClipboardList, ShoppingCart, Users } from "lucide-react";
import { PageContainer } from "@/layouts/PageContainer";
import { PageHeader } from "@/layouts/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviewNotice } from "@/components/shared/PreviewNotice";
import { StatCard } from "./StatCard";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * App-shell dashboard preview. All figures are static placeholders to show the
 * layout; nothing here is fetched from the backend.
 */
export function AppDashboardPage() {
  const { t } = useTranslation();

  const stats = [
    { label: t("nav.orders"), value: "—", icon: ShoppingCart },
    { label: t("nav.products"), value: "—", icon: Boxes },
    { label: t("nav.customers"), value: "—", icon: Users },
    { label: t("nav.purchases"), value: "—", icon: ClipboardList },
  ];

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        title={t("appShell.welcome")}
        description={t("appShell.subtitle")}
      />

      <PreviewNotice message={t("appShell.welcomeText")} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("appShell.panelTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("appShell.panelText")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("appShell.secondaryPanelTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("appShell.secondaryPanelText")}
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground">{t("appShell.hint")}</p>
    </PageContainer>
  );
}
