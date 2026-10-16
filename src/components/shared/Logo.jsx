import { CircuitBoard } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/** Brand mark + wordmark. Direction-agnostic (uses logical spacing). */
export function Logo({ className, showTagline = false }) {
  const { t } = useTranslation();

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <CircuitBoard className="size-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold tracking-tight">
          {t("common.appName")}
        </span>
        {showTagline && (
          <span className="text-xs text-muted-foreground">
            {t("common.appTagline")}
          </span>
        )}
      </span>
    </span>
  );
}
