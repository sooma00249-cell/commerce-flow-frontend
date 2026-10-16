import { useParams } from "react-router-dom";
import { PageContainer } from "@/layouts/PageContainer";
import { PageHeader } from "@/layouts/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviewNotice } from "@/components/shared/PreviewNotice";
import { findAppNavBySlug } from "@/lib/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

/**
 * Placeholder page for app-shell sections that are not built yet. It confirms
 * which section is active (from the nav config) and reserves the page container
 * for the real feature that arrives in a later phase.
 */
export function AppSectionPage() {
  const { section } = useParams();
  const { t } = useTranslation();

  const navItem = findAppNavBySlug(section);
  if (!navItem) return <NotFoundPage />;

  return (
    <PageContainer className="space-y-6">
      <PageHeader title={t(navItem.key)} description={t("appShell.subtitle")} />

      <PreviewNotice />

      <Card>
        <CardHeader>
          <CardTitle>{t("appShell.panelTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t("appShell.panelText")}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
