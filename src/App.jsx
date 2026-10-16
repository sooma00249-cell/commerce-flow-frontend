import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/app/providers/LanguageProvider";
import { AppRoutes } from "@/routes/AppRoutes";

/**
 * Application root: global providers wrap the router.
 * LanguageProvider is outermost so every route (and the document direction)
 * reacts to the selected language.
 */
export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
