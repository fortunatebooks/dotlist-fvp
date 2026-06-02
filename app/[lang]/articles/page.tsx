import type { Metadata } from "next";
import { BlogIndex } from "@/components/site/BlogIndex";
import { localeCodes, resolveLocale, uiCopy } from "@/lib/site/i18n";

type ArticlesPageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return localeCodes.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const copy = uiCopy[locale];

  return {
    title: `Dotlist Articles | ${copy.articlesTitle}`,
    description: copy.articlesSubtitle,
    alternates: {
      canonical: `/${locale}/articles`,
      languages: Object.fromEntries(localeCodes.map((code) => [code, `/${code}/articles`])),
    },
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { lang } = await params;
  return <BlogIndex lang={resolveLocale(lang)} />;
}

