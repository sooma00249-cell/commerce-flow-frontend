import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

/** Form control preview: labels, inputs, hint text, and actions. */
export function FormSection() {
  const { t } = useTranslation();

  // Preview only — submission is intentionally prevented (no backend yet).
  const handleSubmit = (event) => event.preventDefault();

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>{t("design.sampleFormTitle")}</CardTitle>
        <CardDescription>{t("common.designPreviewNote")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="preview-name">{t("form.name")}</Label>
            <Input
              id="preview-name"
              name="name"
              placeholder={t("form.namePlaceholder")}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preview-sku">{t("form.sku")}</Label>
              <Input
                id="preview-sku"
                name="sku"
                placeholder={t("form.skuPlaceholder")}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview-price">{t("form.price")}</Label>
              <Input
                id="preview-price"
                name="price"
                type="number"
                inputMode="decimal"
                placeholder={t("form.pricePlaceholder")}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="reset" variant="ghost">
          {t("form.reset")}
        </Button>
        <Button type="submit">{t("form.submit")}</Button>
      </CardFooter>
    </Card>
  );
}
