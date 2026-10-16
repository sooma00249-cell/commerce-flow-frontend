import { useContext } from "react";
import { LanguageContext } from "@/app/providers/language-context";

/**
 * Access the active language, layout direction, and the `t()` translator.
 * Must be used inside <LanguageProvider>.
 *
 * @returns {{
 *   language: "en" | "ar",
 *   dir: "ltr" | "rtl",
 *   isRTL: boolean,
 *   setLanguage: (lang: string) => void,
 *   toggleLanguage: () => void,
 *   t: (key: string, fallback?: string) => string,
 * }}
 */
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
