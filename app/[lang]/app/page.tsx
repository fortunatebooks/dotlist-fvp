import { FvpApp } from "@/components/FvpApp";
import { localeCodes, resolveLocale } from "@/lib/site/i18n";

type AppPageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return localeCodes.map((lang) => ({ lang }));
}

export default async function AppPage({ params }: AppPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  return (
    <div data-locale={locale}>
      <FvpApp />
    </div>
  );
}

