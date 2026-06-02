import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { authors, type Article, type ArticleTranslation } from "@/lib/site/articles";
import { type LocaleCode, uiCopy } from "@/lib/site/i18n";
import { SiteHeader } from "./SiteHeader";

type ArticleDetailProps = {
  lang: LocaleCode;
  article: Article & { translation: ArticleTranslation };
};

export function ArticleDetail({ lang, article }: ArticleDetailProps) {
  const copy = uiCopy[lang];
  const author = authors[article.authorId];

  return (
    <main className="marketingPage articlePage">
      <SiteHeader lang={lang} />
      <article className="articleShell">
        <Link href={`/${lang}/articles`} className="backLink">
          <ArrowLeft size={16} aria-hidden="true" />
          {copy.backToArticles}
        </Link>
        <header className="articleHeader">
          <div className="articleCardMeta">
            <time dateTime={article.date}>{article.date}</time>
            <span>{article.readingMinutes} {copy.minuteRead}</span>
          </div>
          <h1>{article.translation.title}</h1>
          <p>{article.translation.excerpt}</p>
          <div className="articleAuthor">
            <div className="authorAvatar" aria-hidden="true">
              {author.name
                .replace("Dr. ", "")
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <span>{copy.byline}</span>
              <strong>{author.name}</strong>
              <p>{author.bio[lang]}</p>
            </div>
          </div>
        </header>
        <div className="articleBody">
          {article.translation.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="tagRow articleTags">
          {article.translation.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </article>
      <footer className="siteFooter">{copy.footer}</footer>
    </main>
  );
}

