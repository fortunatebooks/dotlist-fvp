export const localeCodes = [
  "en",
  "fr",
  "de",
  "es",
  "it",
  "pt-br",
  "nl",
  "ko",
  "ja",
  "zh-hans",
  "zh-hant",
  "hi",
] as const;

export type LocaleCode = (typeof localeCodes)[number];

export type LocaleMeta = {
  code: LocaleCode;
  htmlLang: string;
  label: string;
  nativeLabel: string;
  shortLabel: string;
};

export const locales: LocaleMeta[] = [
  { code: "en", htmlLang: "en", label: "English", nativeLabel: "English", shortLabel: "EN" },
  { code: "fr", htmlLang: "fr", label: "French", nativeLabel: "Français", shortLabel: "FR" },
  { code: "de", htmlLang: "de", label: "German", nativeLabel: "Deutsch", shortLabel: "DE" },
  { code: "es", htmlLang: "es", label: "Spanish", nativeLabel: "Español", shortLabel: "ES" },
  { code: "it", htmlLang: "it", label: "Italian", nativeLabel: "Italiano", shortLabel: "IT" },
  { code: "pt-br", htmlLang: "pt-BR", label: "Brazilian Portuguese", nativeLabel: "Português", shortLabel: "PT" },
  { code: "nl", htmlLang: "nl", label: "Dutch", nativeLabel: "Nederlands", shortLabel: "NL" },
  { code: "ko", htmlLang: "ko", label: "Korean", nativeLabel: "한국어", shortLabel: "KO" },
  { code: "ja", htmlLang: "ja", label: "Japanese", nativeLabel: "日本語", shortLabel: "JA" },
  { code: "zh-hans", htmlLang: "zh-Hans", label: "Simplified Chinese", nativeLabel: "简体中文", shortLabel: "简" },
  { code: "zh-hant", htmlLang: "zh-Hant", label: "Traditional Chinese", nativeLabel: "繁體中文", shortLabel: "繁" },
  { code: "hi", htmlLang: "hi", label: "Hindi", nativeLabel: "हिन्दी", shortLabel: "HI" },
];

export const defaultLocale: LocaleCode = "en";

const localeAliases: Record<string, LocaleCode> = {
  en: "en",
  fr: "fr",
  de: "de",
  es: "es",
  it: "it",
  pt: "pt-br",
  "pt-br": "pt-br",
  "pt_BR": "pt-br",
  nl: "nl",
  ko: "ko",
  ja: "ja",
  zh: "zh-hans",
  "zh-cn": "zh-hans",
  "zh-sg": "zh-hans",
  "zh-hans": "zh-hans",
  "zh-tw": "zh-hant",
  "zh-hk": "zh-hant",
  "zh-mo": "zh-hant",
  "zh-hant": "zh-hant",
  hi: "hi",
};

export function isLocaleCode(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function resolveLocale(input?: string | null): LocaleCode {
  if (!input) return defaultLocale;
  const normalized = input.toLowerCase().replace("_", "-");
  if (localeAliases[normalized]) return localeAliases[normalized];
  const base = normalized.split("-")[0];
  return localeAliases[base] ?? defaultLocale;
}

export function getLocaleMeta(locale: LocaleCode): LocaleMeta {
  return locales.find((item) => item.code === locale) ?? locales[0];
}

export function getBestBrowserLocale(languageValues: readonly string[]): LocaleCode {
  for (const language of languageValues) {
    const resolved = resolveLocale(language);
    if (resolved !== defaultLocale || language.toLowerCase().startsWith("en")) {
      return resolved;
    }
  }
  return defaultLocale;
}

type UiCopy = {
  navProduct: string;
  navArticles: string;
  navOpenApp: string;
  language: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  trustedLine: string;
  proofOne: string;
  proofTwo: string;
  proofThree: string;
  problemTitle: string;
  problemBody: string;
  methodTitle: string;
  methodBody: string;
  fitTitle: string;
  fitBody: string;
  priceTitle: string;
  priceBody: string;
  articlesTitle: string;
  articlesSubtitle: string;
  readArticle: string;
  writtenBy: string;
  minuteRead: string;
  backToArticles: string;
  byline: string;
  allArticles: string;
  footer: string;
};

export const siteLabels: Record<
  LocaleCode,
  {
    home: string;
    primaryNavigation: string;
    proofPoints: string;
    productVisual: string;
  }
> = {
  en: {
    home: "Dotlist home",
    primaryNavigation: "Primary navigation",
    proofPoints: "Dotlist proof points",
    productVisual: "Dotlist task selection preview",
  },
  fr: {
    home: "Accueil Dotlist",
    primaryNavigation: "Navigation principale",
    proofPoints: "Preuves Dotlist",
    productVisual: "Aperçu de la sélection de tâches Dotlist",
  },
  de: {
    home: "Dotlist-Startseite",
    primaryNavigation: "Hauptnavigation",
    proofPoints: "Dotlist-Nachweise",
    productVisual: "Vorschau der Dotlist-Aufgabenauswahl",
  },
  es: {
    home: "Inicio de Dotlist",
    primaryNavigation: "Navegación principal",
    proofPoints: "Puntos de prueba de Dotlist",
    productVisual: "Vista previa de selección de tareas de Dotlist",
  },
  it: {
    home: "Home Dotlist",
    primaryNavigation: "Navigazione principale",
    proofPoints: "Punti di prova Dotlist",
    productVisual: "Anteprima della scelta attività di Dotlist",
  },
  "pt-br": {
    home: "Início do Dotlist",
    primaryNavigation: "Navegação principal",
    proofPoints: "Provas do Dotlist",
    productVisual: "Prévia da seleção de tarefas do Dotlist",
  },
  nl: {
    home: "Dotlist-startpagina",
    primaryNavigation: "Hoofdnavigatie",
    proofPoints: "Dotlist-bewijspunten",
    productVisual: "Voorbeeld van taakselectie in Dotlist",
  },
  ko: {
    home: "Dotlist 홈",
    primaryNavigation: "기본 탐색",
    proofPoints: "Dotlist 근거",
    productVisual: "Dotlist 작업 선택 미리보기",
  },
  ja: {
    home: "Dotlist ホーム",
    primaryNavigation: "メインナビゲーション",
    proofPoints: "Dotlist の根拠",
    productVisual: "Dotlist のタスク選択プレビュー",
  },
  "zh-hans": {
    home: "Dotlist 首页",
    primaryNavigation: "主导航",
    proofPoints: "Dotlist 证明点",
    productVisual: "Dotlist 任务选择预览",
  },
  "zh-hant": {
    home: "Dotlist 首頁",
    primaryNavigation: "主導覽",
    proofPoints: "Dotlist 證明點",
    productVisual: "Dotlist 任務選擇預覽",
  },
  hi: {
    home: "Dotlist होम",
    primaryNavigation: "मुख्य नेविगेशन",
    proofPoints: "Dotlist प्रमाण बिंदु",
    productVisual: "Dotlist कार्य चयन पूर्वावलोकन",
  },
};

export const uiCopy: Record<LocaleCode, UiCopy> = {
  en: {
    navProduct: "Product",
    navArticles: "Articles",
    navOpenApp: "Open app",
    language: "Language",
    heroEyebrow: "Final Version Perfected, made calm",
    heroTitle: "A task list that waits for the task you are actually ready to do.",
    heroSubtitle:
      "Dotlist turns one long list into a gentle selection ritual: dot what feels more doable, work the last dot first, and stop arguing with your planner.",
    primaryCta: "Open Dotlist",
    secondaryCta: "Read the method",
    trustedLine: "Built for people who want less planning theater and more finished work.",
    proofOne: "One list",
    proofTwo: "No priority cosplay",
    proofThree: "Works locally",
    problemTitle: "If your to-do app makes you negotiate with 47 priorities, it is part of the work.",
    problemBody:
      "Dotlist keeps the method plain: capture everything, scan once, choose honestly, then work. No dashboards to babysit.",
    methodTitle: "A psychological sorting method, not another productivity costume.",
    methodBody:
      "The FVP scan asks one small question at a time. That makes resistance visible without turning your day into a spreadsheet.",
    fitTitle: "For thoughtful workers, solo builders, researchers, writers, and tired operators.",
    fitBody:
      "Not for teams that need heavyweight project management. Very much for people who need a quiet way to start.",
    priceTitle: "Price",
    priceBody: "Free, open source, and local-first. Export your data anytime.",
    articlesTitle: "Plain-spoken productivity essays",
    articlesSubtitle: "Short, useful articles by Dr. Soyoung Kang and Dr. Luke McCann.",
    readArticle: "Read article",
    writtenBy: "Written by",
    minuteRead: "min read",
    backToArticles: "Back to articles",
    byline: "By",
    allArticles: "All articles",
    footer: "Dotlist is a calm web app for Mark Forster's Final Version Perfected method.",
  },
  fr: {
    navProduct: "Produit",
    navArticles: "Articles",
    navOpenApp: "Ouvrir",
    language: "Langue",
    heroEyebrow: "Final Version Perfected, en plus calme",
    heroTitle: "Une liste qui attend la tâche que vous êtes vraiment prêt à faire.",
    heroSubtitle:
      "Dotlist transforme une longue liste en rituel simple : marquez ce qui semble plus faisable, faites le dernier point, et cessez de négocier avec votre agenda.",
    primaryCta: "Ouvrir Dotlist",
    secondaryCta: "Lire la méthode",
    trustedLine: "Pour celles et ceux qui veulent moins de théâtre organisationnel et plus de travail terminé.",
    proofOne: "Une seule liste",
    proofTwo: "Pas de fausses priorités",
    proofThree: "Fonctionne en local",
    problemTitle: "Si votre app de tâches vous force à arbitrer 47 priorités, elle fait partie du travail.",
    problemBody: "Dotlist reste simple : tout capturer, parcourir une fois, choisir honnêtement, puis agir.",
    methodTitle: "Une méthode de tri psychologique, pas un nouveau costume productivité.",
    methodBody: "Le scan FVP pose une petite question à la fois. La résistance devient visible sans tableur.",
    fitTitle: "Pour travailleurs réfléchis, créateurs solo, chercheurs, écrivains et équipes fatiguées.",
    fitBody: "Pas pour la gestion de projet lourde. Très utile pour commencer sans bruit.",
    priceTitle: "Prix",
    priceBody: "Gratuit, open source et local-first. Exportez vos données à tout moment.",
    articlesTitle: "Essais productivité clairs",
    articlesSubtitle: "Des articles courts et utiles par Dr. Soyoung Kang et Dr. Luke McCann.",
    readArticle: "Lire",
    writtenBy: "Écrit par",
    minuteRead: "min",
    backToArticles: "Retour aux articles",
    byline: "Par",
    allArticles: "Tous les articles",
    footer: "Dotlist est une application calme pour la méthode Final Version Perfected de Mark Forster.",
  },
  de: {
    navProduct: "Produkt",
    navArticles: "Artikel",
    navOpenApp: "App öffnen",
    language: "Sprache",
    heroEyebrow: "Final Version Perfected, ruhiger gedacht",
    heroTitle: "Eine Aufgabenliste, die auf die Aufgabe wartet, für die Sie wirklich bereit sind.",
    heroSubtitle:
      "Dotlist macht aus einer langen Liste ein sanftes Auswahlritual: markieren, was machbarer wirkt, den letzten Punkt zuerst erledigen und weniger mit dem Planer verhandeln.",
    primaryCta: "Dotlist öffnen",
    secondaryCta: "Methode lesen",
    trustedLine: "Für Menschen, die weniger Planungstheater und mehr erledigte Arbeit wollen.",
    proofOne: "Eine Liste",
    proofTwo: "Keine Prioritätsrolle",
    proofThree: "Läuft lokal",
    problemTitle: "Wenn Ihre To-do-App 47 Prioritäten verhandeln lässt, ist sie Teil der Arbeit.",
    problemBody: "Dotlist bleibt schlicht: alles erfassen, einmal scannen, ehrlich wählen, dann arbeiten.",
    methodTitle: "Eine psychologische Sortiermethode, kein neues Produktivitätskostüm.",
    methodBody: "Der FVP-Scan stellt jeweils nur eine kleine Frage. Widerstand wird sichtbar, ohne Tabellenarbeit.",
    fitTitle: "Für reflektierte Arbeitende, Solo-Gründer, Forschende, Schreibende und müde Operatoren.",
    fitBody: "Nicht für schweres Projektmanagement. Sehr gut für Menschen, die leise anfangen müssen.",
    priceTitle: "Preis",
    priceBody: "Während der lokalen Beta kostenlos. Cloud-Sync und Pläne werden vor dem Launch offen angekündigt.",
    articlesTitle: "Klare Produktivitätsessays",
    articlesSubtitle: "Kurze, nützliche Texte von Dr. Soyoung Kang und Dr. Luke McCann.",
    readArticle: "Artikel lesen",
    writtenBy: "Geschrieben von",
    minuteRead: "Min.",
    backToArticles: "Zurück zu den Artikeln",
    byline: "Von",
    allArticles: "Alle Artikel",
    footer: "Dotlist ist eine ruhige Web-App für Mark Forsters Final-Version-Perfected-Methode.",
  },
  es: {
    navProduct: "Producto",
    navArticles: "Artículos",
    navOpenApp: "Abrir app",
    language: "Idioma",
    heroEyebrow: "Final Version Perfected, con calma",
    heroTitle: "Una lista que espera la tarea que de verdad estás listo para hacer.",
    heroSubtitle:
      "Dotlist convierte una lista larga en un ritual sencillo: marca lo que se siente más posible, trabaja el último punto primero y deja de discutir con tu planificador.",
    primaryCta: "Abrir Dotlist",
    secondaryCta: "Leer el método",
    trustedLine: "Para personas que quieren menos teatro de planificación y más trabajo terminado.",
    proofOne: "Una lista",
    proofTwo: "Sin teatro de prioridades",
    proofThree: "Funciona localmente",
    problemTitle: "Si tu app de tareas te hace negociar 47 prioridades, ya es parte del trabajo.",
    problemBody: "Dotlist lo mantiene claro: capturar, revisar una vez, elegir con honestidad y trabajar.",
    methodTitle: "Un método de orden psicológico, no otro disfraz de productividad.",
    methodBody: "El escaneo FVP pregunta algo pequeño cada vez. La resistencia aparece sin convertir el día en una hoja de cálculo.",
    fitTitle: "Para trabajadores reflexivos, creadores solos, investigadores, escritores y operadores cansados.",
    fitBody: "No es gestión pesada de proyectos. Sí es una forma silenciosa de empezar.",
    priceTitle: "Precio",
    priceBody: "Gratis, open source y local-first. Exporta tus datos cuando quieras.",
    articlesTitle: "Ensayos de productividad sin humo",
    articlesSubtitle: "Artículos breves y útiles por Dr. Soyoung Kang y Dr. Luke McCann.",
    readArticle: "Leer artículo",
    writtenBy: "Escrito por",
    minuteRead: "min",
    backToArticles: "Volver a artículos",
    byline: "Por",
    allArticles: "Todos los artículos",
    footer: "Dotlist es una app tranquila para el método Final Version Perfected de Mark Forster.",
  },
  it: {
    navProduct: "Prodotto",
    navArticles: "Articoli",
    navOpenApp: "Apri app",
    language: "Lingua",
    heroEyebrow: "Final Version Perfected, resa calma",
    heroTitle: "Una lista che aspetta il compito che sei davvero pronto a fare.",
    heroSubtitle:
      "Dotlist trasforma una lunga lista in un rito leggero: metti un punto a ciò che senti più fattibile, fai prima l'ultimo punto e smetti di discutere con l'agenda.",
    primaryCta: "Apri Dotlist",
    secondaryCta: "Leggi il metodo",
    trustedLine: "Per chi vuole meno teatro organizzativo e più lavoro finito.",
    proofOne: "Una lista",
    proofTwo: "Niente finta priorità",
    proofThree: "Funziona in locale",
    problemTitle: "Se l'app ti fa negoziare 47 priorità, è già parte del lavoro.",
    problemBody: "Dotlist resta semplice: cattura tutto, scansiona una volta, scegli con onestà, poi lavora.",
    methodTitle: "Un metodo di ordinamento psicologico, non un altro travestimento produttivo.",
    methodBody: "Lo scan FVP pone una piccola domanda alla volta. La resistenza diventa visibile senza fogli di calcolo.",
    fitTitle: "Per lavoratori riflessivi, maker solitari, ricercatori, scrittori e operatori stanchi.",
    fitBody: "Non è project management pesante. È un modo silenzioso per iniziare.",
    priceTitle: "Prezzo",
    priceBody: "Gratis, open source e local-first. Esporta i dati quando vuoi.",
    articlesTitle: "Saggi di produttività chiari",
    articlesSubtitle: "Articoli brevi e utili di Dr. Soyoung Kang e Dr. Luke McCann.",
    readArticle: "Leggi",
    writtenBy: "Scritto da",
    minuteRead: "min",
    backToArticles: "Torna agli articoli",
    byline: "Di",
    allArticles: "Tutti gli articoli",
    footer: "Dotlist è una web app calma per il metodo Final Version Perfected di Mark Forster.",
  },
  "pt-br": {
    navProduct: "Produto",
    navArticles: "Artigos",
    navOpenApp: "Abrir app",
    language: "Idioma",
    heroEyebrow: "Final Version Perfected, sem barulho",
    heroTitle: "Uma lista que espera a tarefa que você está realmente pronto para fazer.",
    heroSubtitle:
      "Dotlist transforma uma lista longa em um ritual simples: marque o que parece mais possível, trabalhe no último ponto primeiro e pare de brigar com o planejador.",
    primaryCta: "Abrir Dotlist",
    secondaryCta: "Ler o método",
    trustedLine: "Para quem quer menos teatro de planejamento e mais trabalho concluído.",
    proofOne: "Uma lista",
    proofTwo: "Sem fantasia de prioridade",
    proofThree: "Funciona localmente",
    problemTitle: "Se seu app faz você negociar 47 prioridades, ele virou parte do trabalho.",
    problemBody: "Dotlist mantém tudo claro: capturar, escanear uma vez, escolher com honestidade e agir.",
    methodTitle: "Um método de triagem psicológica, não outra fantasia de produtividade.",
    methodBody: "O scan FVP faz uma pergunta pequena por vez. A resistência aparece sem planilha.",
    fitTitle: "Para pessoas reflexivas, criadores solo, pesquisadores, escritores e operadores cansados.",
    fitBody: "Não é gestão pesada de projetos. É uma forma calma de começar.",
    priceTitle: "Preço",
    priceBody: "Grátis, open source e local-first. Exporte seus dados quando quiser.",
    articlesTitle: "Ensaios de produtividade diretos",
    articlesSubtitle: "Artigos curtos e úteis por Dr. Soyoung Kang e Dr. Luke McCann.",
    readArticle: "Ler artigo",
    writtenBy: "Escrito por",
    minuteRead: "min",
    backToArticles: "Voltar aos artigos",
    byline: "Por",
    allArticles: "Todos os artigos",
    footer: "Dotlist é um app web calmo para o método Final Version Perfected de Mark Forster.",
  },
  nl: {
    navProduct: "Product",
    navArticles: "Artikelen",
    navOpenApp: "Open app",
    language: "Taal",
    heroEyebrow: "Final Version Perfected, rustig gemaakt",
    heroTitle: "Een takenlijst die wacht op de taak waar je echt klaar voor bent.",
    heroSubtitle:
      "Dotlist maakt van één lange lijst een rustig keuzeritueel: stip aan wat haalbaarder voelt, werk eerst aan de laatste stip en stop met onderhandelen met je planner.",
    primaryCta: "Open Dotlist",
    secondaryCta: "Lees de methode",
    trustedLine: "Voor mensen die minder planningsdrukte en meer afgerond werk willen.",
    proofOne: "Eén lijst",
    proofTwo: "Geen prioriteitstoneel",
    proofThree: "Werkt lokaal",
    problemTitle: "Als je takenapp je 47 prioriteiten laat afwegen, is die app deel van het werk.",
    problemBody: "Dotlist houdt het simpel: alles vastleggen, één keer scannen, eerlijk kiezen en werken.",
    methodTitle: "Een psychologische sorteermethode, geen nieuw productiviteitskostuum.",
    methodBody: "De FVP-scan stelt telkens één kleine vraag. Weerstand wordt zichtbaar zonder spreadsheet.",
    fitTitle: "Voor bedachtzame werkers, solobouwers, onderzoekers, schrijvers en vermoeide operators.",
    fitBody: "Niet voor zwaar projectmanagement. Wel voor mensen die rustig moeten beginnen.",
    priceTitle: "Prijs",
    priceBody: "Gratis, open source en local-first. Exporteer je gegevens wanneer je wilt.",
    articlesTitle: "Heldere productiviteitsessays",
    articlesSubtitle: "Korte, nuttige artikelen van Dr. Soyoung Kang en Dr. Luke McCann.",
    readArticle: "Lees artikel",
    writtenBy: "Geschreven door",
    minuteRead: "min",
    backToArticles: "Terug naar artikelen",
    byline: "Door",
    allArticles: "Alle artikelen",
    footer: "Dotlist is een rustige webapp voor Mark Forsters Final Version Perfected-methode.",
  },
  ko: {
    navProduct: "제품",
    navArticles: "글",
    navOpenApp: "앱 열기",
    language: "언어",
    heroEyebrow: "차분하게 만든 Final Version Perfected",
    heroTitle: "지금 정말 할 준비가 된 일을 기다려 주는 작업 목록.",
    heroSubtitle:
      "Dotlist는 긴 목록을 부드러운 선택 의식으로 바꿉니다. 더 할 만한 일에 점을 찍고, 마지막 점부터 시작하세요.",
    primaryCta: "Dotlist 열기",
    secondaryCta: "방법 읽기",
    trustedLine: "계획하는 척은 줄이고, 끝낸 일은 늘리고 싶은 사람들을 위해 만들었습니다.",
    proofOne: "하나의 목록",
    proofTwo: "가짜 우선순위 없음",
    proofThree: "로컬에서 작동",
    problemTitle: "할 일 앱이 47개의 우선순위를 협상하게 만든다면, 그 앱도 일이 됩니다.",
    problemBody: "Dotlist는 단순합니다. 모두 적고, 한 번 훑고, 솔직하게 고른 뒤 시작합니다.",
    methodTitle: "또 다른 생산성 포장이 아니라 심리적 정렬 방법입니다.",
    methodBody: "FVP 스캔은 한 번에 작은 질문 하나만 던집니다. 저항감이 조용히 보입니다.",
    fitTitle: "생각이 많은 작업자, 1인 제작자, 연구자, 작가, 지친 운영자를 위해.",
    fitBody: "무거운 프로젝트 관리용은 아닙니다. 조용히 시작해야 하는 사람에게 맞습니다.",
    priceTitle: "가격",
    priceBody: "로컬 베타 기간에는 무료입니다. 클라우드 동기화와 유료 플랜은 출시 전에 투명하게 안내합니다.",
    articlesTitle: "담백한 생산성 에세이",
    articlesSubtitle: "Dr. Soyoung Kang와 Dr. Luke McCann의 짧고 쓸모 있는 글.",
    readArticle: "글 읽기",
    writtenBy: "글쓴이",
    minuteRead: "분",
    backToArticles: "글 목록으로",
    byline: "글",
    allArticles: "전체 글",
    footer: "Dotlist는 Mark Forster의 Final Version Perfected 방법을 위한 차분한 웹 앱입니다.",
  },
  ja: {
    navProduct: "製品",
    navArticles: "記事",
    navOpenApp: "アプリを開く",
    language: "言語",
    heroEyebrow: "静かな Final Version Perfected",
    heroTitle: "今ほんとうに取りかかれるタスクを待ってくれるリスト。",
    heroSubtitle:
      "Dotlist は長いリストを穏やかな選択の儀式に変えます。よりできそうなものに点を付け、最後の点から始めます。",
    primaryCta: "Dotlist を開く",
    secondaryCta: "方法を読む",
    trustedLine: "計画ごっこを減らし、終わった仕事を増やしたい人へ。",
    proofOne: "ひとつのリスト",
    proofTwo: "優先順位ごっこなし",
    proofThree: "ローカルで動作",
    problemTitle: "47個の優先順位を交渉させるタスクアプリは、もう仕事の一部です。",
    problemBody: "Dotlist はシンプルです。全部入れ、一度だけ見て、正直に選び、始める。",
    methodTitle: "新しい生産性の衣装ではなく、心理的に並べる方法です。",
    methodBody: "FVP スキャンは小さな質問を一つずつします。抵抗感が静かに見えてきます。",
    fitTitle: "考える仕事をする人、個人開発者、研究者、書き手、疲れた運用担当者へ。",
    fitBody: "重いプロジェクト管理ではありません。静かに始めたい人のための道具です。",
    priceTitle: "価格",
    priceBody: "ローカルベータ中は無料です。クラウド同期と有料プランは公開前に明確に案内します。",
    articlesTitle: "率直な生産性エッセイ",
    articlesSubtitle: "Dr. Soyoung Kang と Dr. Luke McCann による短く役立つ記事。",
    readArticle: "記事を読む",
    writtenBy: "著者",
    minuteRead: "分",
    backToArticles: "記事一覧へ",
    byline: "著者",
    allArticles: "すべての記事",
    footer: "Dotlist は Mark Forster の Final Version Perfected のための静かなウェブアプリです。",
  },
  "zh-hans": {
    navProduct: "产品",
    navArticles: "文章",
    navOpenApp: "打开应用",
    language: "语言",
    heroEyebrow: "更安静的 Final Version Perfected",
    heroTitle: "一份会等待你真正准备好开始的任务清单。",
    heroSubtitle:
      "Dotlist 把长长的清单变成温和的选择仪式：给更想做的任务打点，先做最后一个点，少和计划表争吵。",
    primaryCta: "打开 Dotlist",
    secondaryCta: "阅读方法",
    trustedLine: "为想少一点计划表演、多一点完成感的人设计。",
    proofOne: "一份清单",
    proofTwo: "不演优先级",
    proofThree: "本地可用",
    problemTitle: "如果待办应用让你反复权衡 47 个优先级，它本身就成了工作。",
    problemBody: "Dotlist 保持简单：记录、扫描一次、诚实选择，然后开始。",
    methodTitle: "这是一种心理排序方法，不是新的生产力包装。",
    methodBody: "FVP 扫描每次只问一个小问题。抗拒感会出现，但不会把一天变成表格。",
    fitTitle: "适合深度工作者、独立创作者、研究者、写作者和疲惫的运营者。",
    fitBody: "它不是重型项目管理工具，而是安静开始的方法。",
    priceTitle: "价格",
    priceBody: "本地测试期间免费。云同步和付费计划会在发布前清楚说明。",
    articlesTitle: "清楚好读的生产力文章",
    articlesSubtitle: "Dr. Soyoung Kang 与 Dr. Luke McCann 的短篇实用文章。",
    readArticle: "阅读文章",
    writtenBy: "作者",
    minuteRead: "分钟",
    backToArticles: "返回文章",
    byline: "作者",
    allArticles: "所有文章",
    footer: "Dotlist 是一款用于 Mark Forster Final Version Perfected 方法的安静网页应用。",
  },
  "zh-hant": {
    navProduct: "產品",
    navArticles: "文章",
    navOpenApp: "打開應用",
    language: "語言",
    heroEyebrow: "更安靜的 Final Version Perfected",
    heroTitle: "一份會等待你真正準備好開始的任務清單。",
    heroSubtitle:
      "Dotlist 把長長的清單變成溫和的選擇儀式：替更想做的任務打點，先做最後一個點，少和計畫表爭吵。",
    primaryCta: "打開 Dotlist",
    secondaryCta: "閱讀方法",
    trustedLine: "為想少一點計畫表演、多一點完成感的人設計。",
    proofOne: "一份清單",
    proofTwo: "不演優先級",
    proofThree: "本機可用",
    problemTitle: "如果待辦應用讓你反覆權衡 47 個優先級，它本身就成了工作。",
    problemBody: "Dotlist 保持簡單：記錄、掃描一次、誠實選擇，然後開始。",
    methodTitle: "這是一種心理排序方法，不是新的生產力包裝。",
    methodBody: "FVP 掃描每次只問一個小問題。抗拒感會出現，但不會把一天變成表格。",
    fitTitle: "適合深度工作者、獨立創作者、研究者、寫作者和疲憊的營運者。",
    fitBody: "它不是重型專案管理工具，而是安靜開始的方法。",
    priceTitle: "價格",
    priceBody: "本機測試期間免費。雲端同步和付費方案會在發佈前清楚說明。",
    articlesTitle: "清楚好讀的生產力文章",
    articlesSubtitle: "Dr. Soyoung Kang 與 Dr. Luke McCann 的短篇實用文章。",
    readArticle: "閱讀文章",
    writtenBy: "作者",
    minuteRead: "分鐘",
    backToArticles: "返回文章",
    byline: "作者",
    allArticles: "所有文章",
    footer: "Dotlist 是一款用於 Mark Forster Final Version Perfected 方法的安靜網頁應用。",
  },
  hi: {
    navProduct: "उत्पाद",
    navArticles: "लेख",
    navOpenApp: "ऐप खोलें",
    language: "भाषा",
    heroEyebrow: "Final Version Perfected, शांत अंदाज में",
    heroTitle: "एक ऐसी टास्क सूची जो उस काम का इंतज़ार करती है जिसे आप सच में शुरू कर सकते हैं।",
    heroSubtitle:
      "Dotlist लंबी सूची को सरल चयन-रीति बनाता है: जो काम ज़्यादा संभव लगे उस पर बिंदु लगाइए, आखिरी बिंदु से शुरू कीजिए, और प्लानर से बहस कम कीजिए।",
    primaryCta: "Dotlist खोलें",
    secondaryCta: "तरीका पढ़ें",
    trustedLine: "उन लोगों के लिए जो योजना का नाटक कम और पूरा काम ज़्यादा चाहते हैं।",
    proofOne: "एक सूची",
    proofTwo: "झूठी प्राथमिकता नहीं",
    proofThree: "लोकल चलता है",
    problemTitle: "अगर आपका टू-डू ऐप 47 प्राथमिकताओं पर बहस करवाता है, तो वह खुद काम बन गया है।",
    problemBody: "Dotlist साफ रहता है: सब लिखें, एक बार स्कैन करें, ईमानदारी से चुनें, फिर काम करें।",
    methodTitle: "यह मनोवैज्ञानिक क्रमबद्धता है, उत्पादकता का नया वेश नहीं।",
    methodBody: "FVP स्कैन एक बार में एक छोटा सवाल पूछता है। रुकावट दिखती है, पर दिन स्प्रेडशीट नहीं बनता।",
    fitTitle: "विचारशील कामगारों, अकेले बनाने वालों, शोधकर्ताओं, लेखकों और थके ऑपरेटरों के लिए।",
    fitBody: "यह भारी प्रोजेक्ट मैनेजमेंट नहीं है। यह शांत शुरुआत का तरीका है।",
    priceTitle: "कीमत",
    priceBody: "लोकल बीटा में मुफ्त। क्लाउड सिंक और भुगतान योजनाएं लॉन्च से पहले साफ बताई जाएंगी।",
    articlesTitle: "साफ-सुथरे उत्पादकता लेख",
    articlesSubtitle: "Dr. Soyoung Kang और Dr. Luke McCann के छोटे, उपयोगी लेख।",
    readArticle: "लेख पढ़ें",
    writtenBy: "लेखक",
    minuteRead: "मिनट",
    backToArticles: "लेखों पर लौटें",
    byline: "लेखक",
    allArticles: "सभी लेख",
    footer: "Dotlist Mark Forster की Final Version Perfected पद्धति के लिए शांत वेब ऐप है।",
  },
};
