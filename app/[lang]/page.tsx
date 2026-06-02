import type { Metadata } from "next";
import { LandingPage } from "@/components/site/LandingPage";
import { localeCodes, resolveLocale, uiCopy, type LocaleCode } from "@/lib/site/i18n";

type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return localeCodes.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const copy = uiCopy[locale];

  return {
    title: `Dotlist | ${copy.heroEyebrow}`,
    description: copy.heroSubtitle,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(localeCodes.map((code) => [code, `/${code}`])),
    },
  };
}

export default async function LocalizedLandingPage({ params }: LocalizedPageProps) {
  const { lang } = await params;
  return <LandingPage lang={resolveLocale(lang) as LocaleCode} />;
}

