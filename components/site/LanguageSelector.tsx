"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, resolveLocale, type LocaleCode } from "@/lib/site/i18n";

type LanguageSelectorProps = {
  currentLocale: LocaleCode;
  label: string;
};

function buildLocalizedPath(pathname: string, nextLocale: LocaleCode) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${nextLocale}`;
  if (locales.some((locale) => locale.code === segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }
  return `/${nextLocale}/${segments.join("/")}`;
}

export function LanguageSelector({ currentLocale, label }: LanguageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="siteLanguage">
      <span>{label}</span>
      <select
        value={currentLocale}
        onChange={(event) => {
          const nextLocale = resolveLocale(event.target.value);
          window.localStorage.setItem("dotlist.locale", nextLocale);
          router.push(buildLocalizedPath(pathname || "/", nextLocale));
        }}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

