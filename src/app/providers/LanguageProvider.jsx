import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./language-context";
import {
  DEFAULT_LANGUAGE,
  dictionaries,
  directionFor,
  isSupportedLanguage,
  resolveMessage,
} from "@/locales";

const STORAGE_KEY = "commerceflow.language";

/** Read the persisted language, falling back to the default. */
function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}

/**
 * Provides language state, the document direction, and the `t()` translation
 * function to the whole app. Also keeps `<html lang dir>` and the persisted
 * preference in sync whenever the language changes.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const dir = directionFor(language);
  const isRTL = dir === "rtl";

  // Keep the document element in sync so RTL/LTR and the correct font apply
  // globally (Tailwind's `rtl:`/`ltr:` variants read the `dir` attribute).
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language, dir]);

  const setLanguage = useCallback((next) => {
    if (isSupportedLanguage(next)) setLanguageState(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "en" ? "ar" : "en"));
  }, []);

  /**
   * Translate a dot-path key. `fallback` (or the key itself) is returned when
   * the message is missing, so a stray key never renders as blank.
   */
  const t = useCallback(
    (key, fallback) => {
      const message = resolveMessage(dictionaries[language], key);
      if (message !== undefined) return message;
      const fallbackMessage = resolveMessage(dictionaries[DEFAULT_LANGUAGE], key);
      return fallbackMessage !== undefined ? fallbackMessage : fallback ?? key;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, dir, isRTL, setLanguage, toggleLanguage, t }),
    [language, dir, isRTL, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
