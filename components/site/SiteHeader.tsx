import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { siteLabels, type LocaleCode, uiCopy } from "@/lib/site/i18n";

type SiteHeaderProps = {
  lang: LocaleCode;
};

export function SiteHeader({ lang }: SiteHeaderProps) {
  const copy = uiCopy[lang];
  const labels = siteLabels[lang];

  return (
    <header className="siteHeader">
      <Link href={`/${lang}`} className="siteBrand" aria-label={labels.home}>
        <span className="siteBrandMark">•</span>
        <span>Dotlist</span>
      </Link>
      <nav className="siteNav" aria-label={labels.primaryNavigation}>
        <a href={`/${lang}#product`}>{copy.navProduct}</a>
        <Link href={`/${lang}/articles`}>{copy.navArticles}</Link>
      </nav>
      <div className="siteHeaderActions">
        <LanguageSelector currentLocale={lang} label={copy.language} />
        <Link href={`/${lang}/app`} className="siteHeaderCta">
          <span>{copy.navOpenApp}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
