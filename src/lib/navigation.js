import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LayoutGrid,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

/**
 * Public site navigation (rendered in the marketing/landing header).
 * `key` refers to a translation key; `to` is the router path.
 */
export const PUBLIC_NAV = [
  { to: "/", key: "nav.home", end: true },
  { to: "/design", key: "nav.designSystem" },
  { to: "/app", key: "nav.appShell" },
];

/**
 * Application shell navigation. Each item maps to `/app` or `/app/:slug`.
 * This drives both the desktop sidebar and the mobile horizontal nav, so the
 * two never fall out of sync.
 */
export const APP_NAV = [
  { slug: "", key: "nav.dashboard", icon: LayoutDashboard, end: true },
  { slug: "products", key: "nav.products", icon: Package },
  { slug: "categories", key: "nav.categories", icon: LayoutGrid },
  { slug: "inventory", key: "nav.inventory", icon: Boxes },
  { slug: "orders", key: "nav.orders", icon: ShoppingCart },
  { slug: "purchases", key: "nav.purchases", icon: ClipboardList },
  { slug: "suppliers", key: "nav.suppliers", icon: Truck },
  { slug: "customers", key: "nav.customers", icon: Users },
  { slug: "reports", key: "nav.reports", icon: BarChart3 },
  { slug: "settings", key: "nav.settings", icon: Settings },
];

/** Build the router path for an app nav item. */
export function appNavPath(slug) {
  return slug ? `/app/${slug}` : "/app";
}

/** Find a nav item by its slug (used to label placeholder pages). */
export function findAppNavBySlug(slug) {
  return APP_NAV.find((item) => item.slug === (slug ?? "")) ?? null;
}
