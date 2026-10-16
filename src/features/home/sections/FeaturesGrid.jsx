import { Boxes, Languages, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useTranslation } from "@/hooks/useTranslation";

/** Four-up feature grid describing the foundation's design goals. */
export function FeaturesGrid() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Boxes,
      title: t("home.features.inventoryTitle"),
      text: t("home.features.inventoryText"),
    },
    {
      icon: Languages,
      title: t("home.features.bilingualTitle"),
      text: t("home.features.bilingualText"),
    },
    {
      icon: ShoppingCart,
      title: t("home.features.commerceTitle"),
      text: t("home.features.commerceText"),
    },
    {
      icon: Sparkles,
      title: t("home.features.systemTitle"),
      text: t("home.features.systemText"),
    },
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("home.features.title")}
          description={t("home.features.subtitle")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="pt-1">{feature.title}</CardTitle>
                <CardDescription>{feature.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
