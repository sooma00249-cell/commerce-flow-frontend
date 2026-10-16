import { Languages } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LANGUAGES, SUPPORTED_LANGUAGES } from "@/locales";
import { cn } from "@/lib/utils";

/**
 * Segmented language switcher. Selecting a language updates the whole app's
 * text *and* its layout direction (see LanguageProvider).
 * Implemented as a radio group for keyboard and screen-reader support.
 */
export function LanguageSwitcher({ className }) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-background p-1",
        className,
      )}
    >
      <Languages className="ms-1 size-4 text-muted-foreground" aria-hidden="true" />
      {SUPPORTED_LANGUAGES.map((code) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={t(LANGUAGES[code].labelKey)}
            onClick={() => setLanguage(code)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {code === "ar" ? "AR" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
