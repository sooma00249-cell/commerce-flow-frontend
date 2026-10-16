import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SampleOrdersTable } from "@/components/shared/SampleOrdersTable";
import { PreviewNotice } from "@/components/shared/PreviewNotice";
import { useTranslation } from "@/hooks/useTranslation";

/** Table styling preview wrapped in a card. */
export function TableSection() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <PreviewNotice />
      <Card>
        <CardHeader>
          <CardTitle>{t("design.sampleTableTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <SampleOrdersTable />
        </CardContent>
      </Card>
    </div>
  );
}
