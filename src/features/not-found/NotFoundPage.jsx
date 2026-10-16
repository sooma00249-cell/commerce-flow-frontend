import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

/** 404 content. Rendered standalone for unknown routes and inside the shell. */
export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">{t("notFound.title")}</h1>
      <p className="max-w-md text-muted-foreground">{t("notFound.text")}</p>
      <Button asChild variant="outline" className="mt-2">
        <Link to="/">
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t("notFound.cta")}
        </Link>
      </Button>
    </div>
  );
}
