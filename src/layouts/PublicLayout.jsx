import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { PUBLIC_NAV } from "@/lib/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/**
 * Public marketing layout: sticky header with primary navigation and a footer.
 * Used by the landing page, design-system page, and other open pages.
 */
export function PublicLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <NavLink to="/" aria-label={t("nav.home")} className="shrink-0">
            <Logo showTagline />
          </NavLink>

          <nav aria-label={t("common.appName")} className="hidden items-center gap-1 md:flex">
            {PUBLIC_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Logo />
          <p>{t("footer.note")}</p>
        </div>
      </footer>
    </div>
  );
}
