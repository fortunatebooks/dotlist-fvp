import Link from "next/link";
import { ArrowRight, Check, CircleDot, Sparkles } from "lucide-react";
import { getArticles } from "@/lib/site/articles";
import { siteLabels, type LocaleCode, uiCopy } from "@/lib/site/i18n";
import { SiteHeader } from "./SiteHeader";

type LandingPageProps = {
  lang: LocaleCode;
};

export function LandingPage({ lang }: LandingPageProps) {
  const copy = uiCopy[lang];
  const labels = siteLabels[lang];
  const featuredArticles = getArticles(lang);

  return (
    <main className="marketingPage">
      <SiteHeader lang={lang} />
      <section className="siteHero">
        <div className="siteHeroCopy">
          <p className="siteEyebrow">
            <CircleDot size={16} aria-hidden="true" />
            {copy.heroEyebrow}
          </p>
          <h1>{copy.heroTitle}</h1>
          <p className="siteHeroSubtitle">{copy.heroSubtitle}</p>
          <div className="siteHeroActions">
            <Link href={`/${lang}/app`} className="sitePrimaryButton">
              {copy.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={`/${lang}/articles/${featuredArticles[0].slug}`} className="siteSecondaryButton">
              {copy.secondaryCta}
            </Link>
          </div>
          <p className="siteTrustLine">{copy.trustedLine}</p>
        </div>
        <div className="siteProductVisual" aria-label={labels.productVisual}>
          <div className="visualWindow">
            <div className="visualTopbar">
              <span />
              <span />
              <span />
            </div>
            <div className="visualTask current">
              <span className="visualDot" />
              <div>
                <strong className="visualLine wide" />
                <small className="visualLine short" />
              </div>
            </div>
            <div className="visualQuestion" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="visualTask selected">
              <span className="visualDot filled" />
              <div>
                <strong className="visualLine medium" />
                <small className="visualLine short" />
              </div>
            </div>
            <div className="visualTask">
              <span className="visualDot" />
              <div>
                <strong className="visualLine wide" />
                <small className="visualLine short" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="siteProofStrip" aria-label={labels.proofPoints}>
        {[copy.proofOne, copy.proofTwo, copy.proofThree].map((item) => (
          <div key={item}>
            <Check size={18} aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section id="product" className="siteSplitSection">
        <div>
          <span className="sectionKicker">01</span>
          <h2>{copy.problemTitle}</h2>
          <p>{copy.problemBody}</p>
        </div>
        <div>
          <span className="sectionKicker">02</span>
          <h2>{copy.methodTitle}</h2>
          <p>{copy.methodBody}</p>
        </div>
        <div>
          <span className="sectionKicker">03</span>
          <h2>{copy.fitTitle}</h2>
          <p>{copy.fitBody}</p>
        </div>
      </section>

      <section className="sitePriceBand">
        <Sparkles size={22} aria-hidden="true" />
        <div>
          <h2>{copy.priceTitle}</h2>
          <p>{copy.priceBody}</p>
        </div>
      </section>

      <section className="siteArticlesPreview">
        <div className="sectionIntro">
          <p className="siteEyebrow">{copy.allArticles}</p>
          <h2>{copy.articlesTitle}</h2>
          <p>{copy.articlesSubtitle}</p>
        </div>
        <div className="articleGrid">
          {featuredArticles.map((article) => (
            <article key={article.slug} className="siteArticleCard">
              <div className="articleCardMeta">
                <time dateTime={article.date}>{article.date}</time>
                <span>{article.readingMinutes} {copy.minuteRead}</span>
              </div>
              <h3>
                <Link href={`/${lang}/articles/${article.slug}`}>{article.translation.title}</Link>
              </h3>
              <p>{article.translation.excerpt}</p>
              <Link href={`/${lang}/articles/${article.slug}`} className="articleReadLink">
                {copy.readArticle}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <footer className="siteFooter">{copy.footer}</footer>
    </main>
  );
}
