import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PreviewNotice } from "@/components/shared/PreviewNotice";
import { SampleOrdersTable } from "@/components/shared/SampleOrdersTable";
import { useTranslation } from "@/hooks/useTranslation";

/** Landing section: a compact preview of the styled table + a CTA to the gallery. */
export function Showcase() {
  const { t } = useTranslation();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("home.showcase.title")}
          description={t("home.showcase.subtitle")}
        />

        <PreviewNotice />

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{t("design.sampleTableTitle")}</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/design">
                {t("common.viewDesignSystem")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <SampleOrdersTable />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
