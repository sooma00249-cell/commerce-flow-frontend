import { Link } from "react-router-dom";
import { ArrowRight, Boxes, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

/** Landing hero: value proposition plus primary calls to action. */
export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <Badge variant="outline" className="gap-1.5">
            <Boxes className="size-3.5" aria-hidden="true" />
            {t("home.hero.eyebrow")}
          </Badge>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("home.hero.title")}
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("home.hero.subtitle")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/design">
                {t("home.hero.primaryCta")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app">
                <LayoutDashboard className="size-4" aria-hidden="true" />
                {t("home.hero.secondaryCta")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
