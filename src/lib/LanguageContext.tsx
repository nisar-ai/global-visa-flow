"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dictionaries, languageOptions, type LanguageCode, type Dictionary } from "@/data/i18n";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: Dictionary;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "gvf-language";
const DEFAULT_LANGUAGE: LanguageCode = "en";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && dictionaries[stored]) {
        // Hydrate saved preference after mount (SSR has no access to localStorage).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(stored);
      }
    } catch {
      // If localStorage is unavailable (private browsing, etc.), stay on default.
    }
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    if (!dictionaries[code]) {
      // Fallback to default if an invalid code is passed.
      code = DEFAULT_LANGUAGE;
    }
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const langOption = languageOptions.find((l) => l.code === language);
  const dir = langOption?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: dictionaries[language] ?? dictionaries[DEFAULT_LANGUAGE],
    dir,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}