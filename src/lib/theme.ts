"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "ct-theme";
const THEME_COLOR: Record<Theme, string> = { light: "#F8F5EF", dark: "#14161B" };

/** Runs in <head> before first paint so the page never flashes the wrong theme (same rules as the main website). */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add("dark");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLOR.dark}")}}catch(e){}})();`;

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function system(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

// The <html> class is the source of truth (set before first paint by THEME_SCRIPT).
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerSnapshot = (): Theme => "light";

/** Light/dark theme. Follows the device setting until the visitor picks one, then remembers the choice. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = () => {
      if (!stored()) apply(system());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this page view only */
    }
    apply(next);
  }, []);

  return { theme, toggle };
}
