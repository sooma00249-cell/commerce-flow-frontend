import en from "./en";
import ar from "./ar";

/**
 * Supported languages and their layout direction.
 * Adding a language means: add a dictionary file, then register it here.
 */
export const LANGUAGES = {
  en: { code: "en", labelKey: "common.english", dir: "ltr" },
  ar: { code: "ar", labelKey: "common.arabic", dir: "rtl" },
};

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

export const DEFAULT_LANGUAGE = "en";

export const dictionaries = { en, ar };

/**
 * Resolve a dot-path key (e.g. "nav.home") from a nested dictionary object.
 * Returns `undefined` when the path does not exist so callers can fall back.
 */
export function resolveMessage(dictionary, key) {
  if (!dictionary || !key) return undefined;
  return key
    .split(".")
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dictionary);
}

export function directionFor(language) {
  return LANGUAGES[language]?.dir ?? "ltr";
}

export function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language);
}
