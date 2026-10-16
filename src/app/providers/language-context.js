import { createContext } from "react";

/**
 * React context that carries the active language, the resolved layout
 * direction, and the translation helpers. Consumed via `useTranslation()`.
 */
export const LanguageContext = createContext(null);
