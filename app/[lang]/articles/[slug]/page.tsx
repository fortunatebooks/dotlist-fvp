import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/site/ArticleDetail";
import { getArticle, getArticleStaticParams } from "@/lib/site/articles";
import { localeCodes, resolveLocale } from "@/lib/site/i18n";

type ArticlePageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return getArticleStaticParams();
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const article = getArticle(slug, locale);
  if (!article) return {};

  return {
    title: article.translation.seoTitle,
    description: article.translation.seoDescription,
    alternates: {
      canonical: `/${locale}/articles/${article.slug}`,
      languages: Object.fromEntries(localeCodes.map((code) => [code, `/${code}/articles/${article.slug}`])),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const article = getArticle(slug, locale);

  if (!article) notFound();

  return <ArticleDetail lang={locale} article={article} />;
}

