"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBestBrowserLocale, resolveLocale } from "@/lib/site/i18n";

export function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("dotlist.locale");
    const targetLocale = savedLocale
      ? resolveLocale(savedLocale)
      : getBestBrowserLocale(window.navigator.languages || [window.navigator.language]);

    document.documentElement.lang = targetLocale;

    if (targetLocale !== "en") {
      router.replace(`/${targetLocale}`);
    }
  }, [router]);

  return null;
}

