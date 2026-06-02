import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { authors, getArticles } from "@/lib/site/articles";
import { type LocaleCode, uiCopy } from "@/lib/site/i18n";
import { SiteHeader } from "./SiteHeader";

type BlogIndexProps = {
  lang: LocaleCode;
};

export function BlogIndex({ lang }: BlogIndexProps) {
  const copy = uiCopy[lang];
  const posts = getArticles(lang);

  return (
    <main className="marketingPage blogPage">
      <SiteHeader lang={lang} />
      <section className="blogHero">
        <p className="siteEyebrow">{copy.allArticles}</p>
        <h1>{copy.articlesTitle}</h1>
        <p>{copy.articlesSubtitle}</p>
      </section>
      <section className="articleGrid articleGridLarge">
        {posts.map((post) => {
          const author = authors[post.authorId];
          return (
            <article key={post.slug} className="siteArticleCard featureArticleCard">
              <div className="articleCardMeta">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingMinutes} {copy.minuteRead}</span>
              </div>
              <h2>
                <Link href={`/${lang}/articles/${post.slug}`}>{post.translation.title}</Link>
              </h2>
              <p>{post.translation.excerpt}</p>
              <div className="authorMini">
                <span>{copy.writtenBy}</span>
                <strong>{author.name}</strong>
              </div>
              <div className="tagRow">
                {post.translation.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link href={`/${lang}/articles/${post.slug}`} className="articleReadLink">
                {copy.readArticle}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>
      <footer className="siteFooter">{copy.footer}</footer>
    </main>
  );
}

