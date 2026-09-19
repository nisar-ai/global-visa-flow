"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * A hook that persists state in localStorage.
 *
 * Behavior:
 * - On the server (SSR), it returns `initialValue` and `hydrated = false`.
 * - After mount, it reads from localStorage (if available) and updates state.
 * - If localStorage is unavailable (private browsing, quota, etc.), it behaves
 *   like normal in-memory state and does not throw.
 *
 * @param key - The localStorage key to use.
 * @param initialValue - The fallback value if no stored value exists.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    try {
      const raw =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        if (isMounted) {
          // Hydrate persisted value after mount (SSR has no access to localStorage).
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setValue(parsed);
        }
      }
    } catch {
      // Ignore malformed storage or unavailable localStorage.
    }

    if (isMounted) {
      setHydrated(true);
    }

    return () => {
      isMounted = false;
    };
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;

        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          }
        } catch {
          // Storage may be unavailable (private browsing, quota) — fail silently.
        }

        return resolved;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore if storage is unavailable.
    }
    setValue(initialValue);
    setHydrated(true);
  }, [key, initialValue]);

  return [value, update, hydrated, remove] as const;
}