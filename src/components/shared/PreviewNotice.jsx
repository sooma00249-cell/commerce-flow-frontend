import { Info } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/**
 * Small banner reminding viewers that sample content is illustrative only and
 * not sourced from the backend. Reused across preview pages.
 */
export function PreviewNotice({ className, message }) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-md border border-border bg-accent/60 px-3.5 py-2.5 text-sm text-accent-foreground",
        className,
      )}
      role="note"
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>{message ?? t("common.designPreviewNote")}</p>
    </div>
  );
}
