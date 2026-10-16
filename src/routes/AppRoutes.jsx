import { Route, Routes } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { HomePage } from "@/features/home/HomePage";
import { DesignSystemPage } from "@/features/design/DesignSystemPage";
import { AppDashboardPage } from "@/features/app-preview/AppDashboardPage";
import { AppSectionPage } from "@/features/app-preview/AppSectionPage";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

/**
 * Central route table.
 * - Public pages share <PublicLayout> (header + footer).
 * - Application pages share <AppLayout> (sidebar + header + container).
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="design" element={<DesignSystemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<AppDashboardPage />} />
        <Route path=":section" element={<AppSectionPage />} />
      </Route>
    </Routes>
  );
}
