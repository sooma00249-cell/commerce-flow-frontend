import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { APP_NAV, appNavPath } from "@/lib/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/**
 * Application shell: persistent sidebar on large screens, a horizontal
 * scrollable nav on small screens, and a sticky top bar. The same APP_NAV
 * config feeds both nav renderings.
 */
export function AppLayout() {
  const { t } = useTranslation();

  const navLinkClasses = ({ isActive }) =>
    cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <div className="min-h-svh bg-muted/30">
      <div className="lg:grid lg:grid-cols-[16rem_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden border-e border-border bg-background lg:flex lg:h-svh lg:flex-col lg:sticky lg:top-0">
          <div className="flex h-16 items-center border-b border-border px-4">
            <NavLink to="/" aria-label={t("nav.home")}>
              <Logo />
            </NavLink>
          </div>
          <nav
            aria-label={t("nav.appShell")}
            className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          >
            {APP_NAV.map((item) => (
              <NavLink
                key={item.slug || "dashboard"}
                to={appNavPath(item.slug)}
                end={item.end}
                className={navLinkClasses}
              >
                <item.icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{t(item.key)}</span>
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-border p-3">
            <Badge variant="secondary" className="w-full justify-center py-1.5">
              {t("common.designPreview")}
            </Badge>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-h-svh flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
              <NavLink to="/" aria-label={t("nav.home")} className="lg:hidden">
                <Logo />
              </NavLink>
              <span className="hidden text-sm font-medium text-muted-foreground lg:block">
                {t("common.designPreview")}
              </span>
              <LanguageSwitcher />
            </div>

            {/* Mobile horizontal nav */}
            <nav
              aria-label={t("nav.appShell")}
              className="flex gap-1 overflow-x-auto border-t border-border px-2 py-2 lg:hidden"
            >
              {APP_NAV.map((item) => (
                <NavLink
                  key={item.slug || "dashboard"}
                  to={appNavPath(item.slug)}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  <item.icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{t(item.key)}</span>
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
