import { defaultLocale, type LocaleCode } from "./i18n";

export type AuthorId = "soyoung-kang" | "luke-mccann";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleTranslation = {
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  sections: ArticleSection[];
};

export type Article = {
  slug: string;
  date: string;
  authorId: AuthorId;
  readingMinutes: number;
  translations: Record<LocaleCode, ArticleTranslation>;
};

export const authors: Record<
  AuthorId,
  {
    name: string;
    title: string;
    bio: Record<LocaleCode, string>;
  }
> = {
  "soyoung-kang": {
    name: "Dr. Soyoung Kang",
    title: "Cognitive psychologist and practical systems writer",
    bio: {
      en: "Soyoung studies attention, hesitation, and the small rituals that help real people begin. She writes with warmth, rigor, and a suspicious fondness for tiny notebooks.",
      fr: "Soyoung étudie l'attention, l'hésitation et les petits rituels qui aident à commencer. Elle écrit avec chaleur, rigueur et un faible très assumé pour les carnets minuscules.",
      de: "Soyoung untersucht Aufmerksamkeit, Zögern und kleine Rituale, die Menschen beim Anfangen helfen. Sie schreibt warm, präzise und mit verdächtiger Liebe zu winzigen Notizbüchern.",
      es: "Soyoung estudia la atención, la duda y los pequeños rituales que ayudan a empezar. Escribe con calidez, rigor y una sospechosa afición por los cuadernos diminutos.",
      it: "Soyoung studia attenzione, esitazione e piccoli rituali che aiutano a iniziare. Scrive con calore, rigore e un sospetto amore per i taccuini minuscoli.",
      "pt-br": "Soyoung estuda atenção, hesitação e pequenos rituais que ajudam pessoas reais a começar. Escreve com calor, rigor e uma queda suspeita por cadernos minúsculos.",
      nl: "Soyoung onderzoekt aandacht, aarzeling en kleine rituelen die echte mensen helpen beginnen. Ze schrijft warm, precies en met een verdachte liefde voor kleine notitieboekjes.",
      ko: "Soyoung은 주의, 망설임, 시작을 돕는 작은 의식을 연구합니다. 따뜻하고 엄밀하게 쓰며 작은 노트를 유난히 좋아합니다.",
      ja: "Soyoung は注意、ためらい、始めるための小さな儀式を研究しています。温かく厳密に、そして小さなノートへの愛を隠さず書きます。",
      "zh-hans": "Soyoung 研究注意力、犹豫以及帮助人开始的小仪式。她写得温暖、严谨，也非常喜欢小小的笔记本。",
      "zh-hant": "Soyoung 研究注意力、猶豫以及幫助人開始的小儀式。她寫得溫暖、嚴謹，也非常喜歡小小的筆記本。",
      hi: "Soyoung ध्यान, झिझक और शुरू करने में मदद करने वाली छोटी आदतों का अध्ययन करती हैं। उनका लेखन गर्म, सटीक और छोटे नोटबुकों के प्रति थोड़ा पक्षपाती है।",
    },
  },
  "luke-mccann": {
    name: "Dr. Luke McCann",
    title: "Work-design researcher and recovering overplanner",
    bio: {
      en: "Luke researches how knowledge workers choose, avoid, and finish work. He is cheerful about evidence and gently ruthless about bloated productivity advice.",
      fr: "Luke étudie la manière dont les travailleurs du savoir choisissent, évitent et terminent leur travail. Il aime les preuves et taille sans pitié dans les conseils productivité gonflés.",
      de: "Luke erforscht, wie Wissensarbeiter Arbeit wählen, vermeiden und abschließen. Er mag Evidenz und kürzt aufgeblähte Produktivitätstipps mit freundlicher Härte.",
      es: "Luke investiga cómo los trabajadores del conocimiento eligen, evitan y terminan trabajo. Le entusiasma la evidencia y recorta sin piedad los consejos inflados.",
      it: "Luke studia come chi lavora con la conoscenza sceglie, evita e finisce il lavoro. Ama le prove e taglia con gentile ferocia i consigli gonfiati.",
      "pt-br": "Luke pesquisa como trabalhadores do conhecimento escolhem, evitam e concluem trabalho. Gosta de evidência e corta conselhos inchados com gentile firmeza.",
      nl: "Luke onderzoekt hoe kenniswerkers werk kiezen, vermijden en afronden. Hij is opgewekt over bewijs en vriendelijk meedogenloos over opgeblazen productiviteitsadvies.",
      ko: "Luke는 지식 노동자가 일을 고르고 피하고 끝내는 방식을 연구합니다. 근거를 좋아하고 부풀린 생산성 조언에는 부드럽게 엄격합니다.",
      ja: "Luke は知識労働者が仕事を選び、避け、終える仕組みを研究しています。根拠には明るく、膨らみすぎた助言にはやさしく手厳しい人です。",
      "zh-hans": "Luke 研究知识工作者如何选择、回避并完成工作。他喜欢证据，也会温和但坚决地删掉臃肿的生产力建议。",
      "zh-hant": "Luke 研究知識工作者如何選擇、迴避並完成工作。他喜歡證據，也會溫和但堅決地刪掉臃腫的生產力建議。",
      hi: "Luke शोध करते हैं कि ज्ञान-कर्मी काम कैसे चुनते, टालते और पूरा करते हैं। उन्हें प्रमाण पसंद हैं और फूली हुई उत्पादकता सलाह पर वे नरम लेकिन सख्त हैं।",
    },
  },
};

const articleOne: Record<LocaleCode, ArticleTranslation> = {
  en: {
    title: "What Final Version Perfected Actually Fixes",
    excerpt: "FVP is not a motivational trick. It is a way to choose from a real list without pretending every task has a clean priority.",
    seoTitle: "What Is Final Version Perfected? A Clear Guide to FVP",
    seoDescription: "A practical explanation of Mark Forster's Final Version Perfected method, why dotting tasks works, and how Dotlist supports the habit.",
    tags: ["Final Version Perfected", "task selection", "productivity method"],
    sections: [
      {
        heading: "The problem is not your list. It is the argument around the list.",
        paragraphs: [
          "Most to-do systems ask you to decide what matters most before you know what you can face. That sounds sensible until Monday morning arrives with six urgent tasks, one vague life-admin item, and a brain that would rather become a fern.",
          "Final Version Perfected, often shortened to FVP, starts from a kinder assumption: readiness matters. You keep one long list, then scan it with a simple question. What do I want to do more than this?",
        ],
      },
      {
        heading: "Dots reveal readiness without making a drama out of it.",
        paragraphs: [
          "When a later task feels more doable than the current benchmark, you dot it. The last dotted task becomes the one you work first. This sounds almost too small, but that is the point. It gives hesitation somewhere to go.",
          "You are not ranking your whole life. You are noticing one preference at a time. That makes the method surprisingly good for days when ambitious planning would collapse under its own theatrical lighting.",
        ],
      },
      {
        heading: "Dotlist keeps the ritual visible.",
        paragraphs: [
          "Dotlist preserves the one-list structure, the scan, and the last-dot-first rule. It avoids turning FVP into a dashboard festival. The interface is there to hold the method still while you make one honest choice.",
          "That is also why the app feels deliberately quiet. If a tool claims to reduce friction, it should not ask you to maintain a second hobby called tool maintenance.",
        ],
      },
    ],
  },
  fr: {
    title: "Ce que Final Version Perfected répare vraiment",
    excerpt: "FVP n'est pas une astuce de motivation. C'est une manière de choisir dans une vraie liste sans inventer des priorités parfaites.",
    seoTitle: "Qu'est-ce que Final Version Perfected ? Guide clair de FVP",
    seoDescription: "Une explication pratique de la méthode Final Version Perfected de Mark Forster, du pointage des tâches et du rôle de Dotlist.",
    tags: ["Final Version Perfected", "choix des tâches", "productivité"],
    sections: [
      { heading: "Le problème n'est pas la liste, mais la dispute autour d'elle.", paragraphs: ["La plupart des systèmes demandent de décider ce qui compte le plus avant de savoir ce que l'on peut affronter. C'est logique en théorie, moins le lundi matin.", "FVP part d'une idée plus humaine : la disponibilité psychologique compte. On garde une longue liste et on la parcourt avec une question simple. Qu'ai-je envie de faire plus que ceci ?"] },
      { heading: "Les points montrent la disponibilité sans grand théâtre.", paragraphs: ["Quand une tâche plus bas dans la liste semble plus faisable que le repère actuel, on la pointe. Le dernier point devient la prochaine action.", "On ne classe pas toute sa vie. On remarque une préférence à la fois, ce qui aide les jours où la grande planification s'effondre."] },
      { heading: "Dotlist garde le rituel lisible.", paragraphs: ["Dotlist conserve la liste unique, le scan et la règle du dernier point d'abord. L'interface soutient la méthode sans la transformer en tableau de bord.", "Un outil qui réduit la friction ne devrait pas créer un deuxième travail appelé maintenance de l'outil."] },
    ],
  },
  de: {
    title: "Was Final Version Perfected wirklich löst",
    excerpt: "FVP ist kein Motivationstrick. Es ist eine Art, aus einer echten Liste zu wählen, ohne perfekte Prioritäten zu erfinden.",
    seoTitle: "Was ist Final Version Perfected? Ein klarer FVP-Leitfaden",
    seoDescription: "Eine praktische Erklärung von Mark Forsters Final-Version-Perfected-Methode, dem Punktescan und Dotlist.",
    tags: ["Final Version Perfected", "Aufgabenauswahl", "Produktivität"],
    sections: [
      { heading: "Das Problem ist nicht die Liste, sondern die Verhandlung darum.", paragraphs: ["Viele Systeme verlangen Prioritäten, bevor klar ist, was man innerlich überhaupt anfassen kann. Auf Papier klingt das vernünftig, am Montagmorgen weniger.", "FVP nimmt Bereitschaft ernst. Man behält eine lange Liste und scannt sie mit einer einfachen Frage: Was möchte ich lieber tun als dies?"] },
      { heading: "Punkte zeigen Bereitschaft ohne Drama.", paragraphs: ["Wenn eine spätere Aufgabe machbarer wirkt als der aktuelle Vergleichspunkt, bekommt sie einen Punkt. Der letzte Punkt wird zuerst erledigt.", "Man sortiert nicht das ganze Leben. Man bemerkt jeweils nur eine Präferenz. Genau deshalb funktioniert es an zähen Tagen."] },
      { heading: "Dotlist hält das Ritual sichtbar.", paragraphs: ["Dotlist bewahrt die Ein-Liste-Struktur, den Scan und die Letzter-Punkt-zuerst-Regel. Es macht daraus kein Dashboard-Spektakel.", "Ein Werkzeug, das Reibung senken will, sollte kein neues Hobby namens Werkzeugpflege erzeugen."] },
    ],
  },
  es: {
    title: "Lo que Final Version Perfected arregla de verdad",
    excerpt: "FVP no es un truco motivacional. Es una forma de elegir desde una lista real sin fingir prioridades perfectas.",
    seoTitle: "Qué es Final Version Perfected: guía clara de FVP",
    seoDescription: "Una explicación práctica del método Final Version Perfected de Mark Forster, por qué funcionan los puntos y cómo ayuda Dotlist.",
    tags: ["Final Version Perfected", "selección de tareas", "productividad"],
    sections: [
      { heading: "El problema no es la lista. Es la discusión alrededor de la lista.", paragraphs: ["Muchos sistemas piden decidir lo más importante antes de saber qué puedes afrontar. Suena razonable hasta que llega el lunes.", "FVP empieza con una idea amable: la preparación psicológica importa. Mantienes una lista larga y preguntas: ¿qué quiero hacer más que esto?"] },
      { heading: "Los puntos muestran disponibilidad sin montar una obra.", paragraphs: ["Si una tarea posterior se siente más posible que el punto de comparación, la marcas. El último punto se trabaja primero.", "No estás clasificando toda tu vida. Estás notando una preferencia cada vez, justo lo que hace falta en días espesos."] },
      { heading: "Dotlist mantiene visible el ritual.", paragraphs: ["Dotlist conserva la lista única, el escaneo y la regla de trabajar el último punto. No convierte FVP en un festival de paneles.", "Una herramienta que reduce fricción no debería pedirte mantener otra herramienta como afición."] },
    ],
  },
  it: {
    title: "Cosa risolve davvero Final Version Perfected",
    excerpt: "FVP non è un trucco motivazionale. È un modo per scegliere da una lista reale senza fingere priorità perfette.",
    seoTitle: "Cos'è Final Version Perfected: guida chiara a FVP",
    seoDescription: "Una spiegazione pratica del metodo Final Version Perfected di Mark Forster, dei punti e di come Dotlist sostiene l'abitudine.",
    tags: ["Final Version Perfected", "scelta dei compiti", "produttività"],
    sections: [
      { heading: "Il problema non è la lista, ma la discussione intorno alla lista.", paragraphs: ["Molti sistemi chiedono di decidere cosa conta prima di capire cosa puoi davvero affrontare. Funziona sulla carta, meno il lunedì mattina.", "FVP parte da un presupposto più gentile: la prontezza conta. Tieni una lunga lista e chiedi: cosa voglio fare più di questo?"] },
      { heading: "I punti mostrano prontezza senza teatro.", paragraphs: ["Quando un compito successivo sembra più fattibile, lo punti. L'ultimo punto diventa il primo lavoro.", "Non stai ordinando tutta la vita. Stai notando una preferenza alla volta, e questo basta per ripartire."] },
      { heading: "Dotlist rende il rito visibile.", paragraphs: ["Dotlist conserva lista unica, scansione e regola dell'ultimo punto. Non trasforma FVP in un carnevale di dashboard.", "Uno strumento che riduce attrito non dovrebbe creare un secondo lavoro chiamato manutenzione dello strumento."] },
    ],
  },
  "pt-br": {
    title: "O que o Final Version Perfected resolve de verdade",
    excerpt: "FVP não é truque motivacional. É um jeito de escolher numa lista real sem fingir que toda tarefa tem prioridade limpa.",
    seoTitle: "O que é Final Version Perfected? Guia claro de FVP",
    seoDescription: "Uma explicação prática do método Final Version Perfected de Mark Forster, do uso de pontos e de como o Dotlist ajuda.",
    tags: ["Final Version Perfected", "escolha de tarefas", "produtividade"],
    sections: [
      { heading: "O problema não é a lista. É a briga em volta dela.", paragraphs: ["Muitos sistemas pedem prioridade antes de você saber o que consegue encarar. Parece lógico até a segunda-feira chegar.", "FVP parte de uma ideia mais humana: prontidão importa. Você mantém uma lista longa e pergunta: o que quero fazer mais do que isto?"] },
      { heading: "Os pontos mostram prontidão sem drama.", paragraphs: ["Quando uma tarefa mais abaixo parece mais possível, você marca um ponto. O último ponto é trabalhado primeiro.", "Você não está ranqueando a vida inteira. Está percebendo uma preferência por vez, o bastante para destravar."] },
      { heading: "Dotlist mantém o ritual visível.", paragraphs: ["Dotlist preserva a lista única, o scan e a regra do último ponto primeiro. Não vira um festival de dashboards.", "Uma ferramenta que reduz atrito não deveria criar outro trabalho chamado manutenção da ferramenta."] },
    ],
  },
  nl: {
    title: "Wat Final Version Perfected echt oplost",
    excerpt: "FVP is geen motivatietruc. Het is een manier om uit een echte lijst te kiezen zonder nette prioriteiten te verzinnen.",
    seoTitle: "Wat is Final Version Perfected? Een heldere FVP-gids",
    seoDescription: "Een praktische uitleg van Mark Forsters Final Version Perfected-methode, waarom stippen werkt en hoe Dotlist helpt.",
    tags: ["Final Version Perfected", "taken kiezen", "productiviteit"],
    sections: [
      { heading: "Het probleem is niet je lijst, maar het overleg rond de lijst.", paragraphs: ["Veel systemen vragen wat het belangrijkst is voordat je weet wat je aankunt. Dat klinkt verstandig tot maandagochtend.", "FVP begint vriendelijker: bereidheid telt. Je houdt één lange lijst en vraagt: wat wil ik liever doen dan dit?"] },
      { heading: "Stippen tonen bereidheid zonder drama.", paragraphs: ["Voelt een latere taak haalbaarder, dan geef je die een stip. De laatste stip komt eerst aan de beurt.", "Je rangschikt niet je hele leven. Je merkt één voorkeur tegelijk op. Dat is klein, en precies daarom bruikbaar."] },
      { heading: "Dotlist houdt het ritueel zichtbaar.", paragraphs: ["Dotlist bewaart de ene lijst, de scan en de laatste-stip-eerst-regel. Het maakt van FVP geen dashboardfeest.", "Een hulpmiddel dat wrijving verlaagt, moet geen extra klus genaamd toolonderhoud worden."] },
    ],
  },
  ko: {
    title: "Final Version Perfected가 실제로 해결하는 것",
    excerpt: "FVP는 동기부여 요령이 아닙니다. 모든 일에 완벽한 우선순위가 있는 척하지 않고 실제 목록에서 고르는 방법입니다.",
    seoTitle: "Final Version Perfected란? FVP 쉬운 안내",
    seoDescription: "Mark Forster의 Final Version Perfected 방법, 점 찍기의 이유, Dotlist가 돕는 방식을 설명합니다.",
    tags: ["Final Version Perfected", "작업 선택", "생산성"],
    sections: [
      { heading: "문제는 목록이 아니라 목록 주변의 논쟁입니다.", paragraphs: ["많은 시스템은 내가 무엇을 감당할 수 있는지 알기도 전에 가장 중요한 일을 정하라고 합니다. 월요일 아침에는 그럴듯하지 않습니다.", "FVP는 더 다정한 전제에서 시작합니다. 준비됨이 중요합니다. 긴 목록을 두고 묻습니다. 이것보다 더 하고 싶은 일은 무엇인가요?"] },
      { heading: "점은 준비됨을 조용히 보여 줍니다.", paragraphs: ["아래쪽 일이 현재 기준보다 더 할 만하게 느껴지면 점을 찍습니다. 마지막 점이 먼저 할 일이 됩니다.", "삶 전체를 순위 매기지 않습니다. 한 번에 하나의 선호만 알아차립니다. 그래서 지친 날에도 작동합니다."] },
      { heading: "Dotlist는 의식을 보이게 유지합니다.", paragraphs: ["Dotlist는 하나의 목록, 스캔, 마지막 점 우선 규칙을 지킵니다. FVP를 대시보드 축제로 만들지 않습니다.", "마찰을 줄인다는 도구가 도구 관리라는 두 번째 일을 만들면 곤란합니다."] },
    ],
  },
  ja: {
    title: "Final Version Perfected が本当に直すもの",
    excerpt: "FVP はやる気の小技ではありません。すべてにきれいな優先順位があるふりをせず、現実のリストから選ぶ方法です。",
    seoTitle: "Final Version Perfected とは？FVP のわかりやすい案内",
    seoDescription: "Mark Forster の Final Version Perfected、点を付ける理由、Dotlist の使い方を実用的に説明します。",
    tags: ["Final Version Perfected", "タスク選択", "生産性"],
    sections: [
      { heading: "問題はリストではなく、リストをめぐる交渉です。", paragraphs: ["多くの仕組みは、何に向き合えるか分かる前に重要度を決めさせます。紙の上では賢そうでも、月曜の朝にはつらい。", "FVP はもっとやさしい前提から始まります。準備ができているかは大事です。長いリストを見て、これよりやりたいことは何か、と問います。"] },
      { heading: "点は準備状態を大げさにせず見せます。", paragraphs: ["後ろのタスクのほうができそうなら点を付けます。最後の点が最初に取り組む仕事です。", "人生全体を順位付けしているのではありません。ひとつずつ好みを見ています。だから重い日にも使えます。"] },
      { heading: "Dotlist は儀式を見えるままにします。", paragraphs: ["Dotlist は一つのリスト、スキャン、最後の点から始める規則を保ちます。FVP をダッシュボード祭りにはしません。", "摩擦を減らす道具が、道具の管理という二つ目の仕事を作るべきではありません。"] },
    ],
  },
  "zh-hans": {
    title: "Final Version Perfected 真正解决了什么",
    excerpt: "FVP 不是激励技巧。它是在真实清单中做选择，而不是假装每件事都有整齐的优先级。",
    seoTitle: "什么是 Final Version Perfected？FVP 清晰指南",
    seoDescription: "实用解释 Mark Forster 的 Final Version Perfected 方法、打点为什么有效，以及 Dotlist 如何支持这个习惯。",
    tags: ["Final Version Perfected", "任务选择", "生产力"],
    sections: [
      { heading: "问题不是清单，而是围绕清单的争论。", paragraphs: ["许多系统要求你先决定最重要的事，却不管你此刻能否面对它。听起来合理，到了周一早上就不一定了。", "FVP 从更温和的假设开始：心理准备很重要。你保留一份长清单，然后问：我更想做哪件事？"] },
      { heading: "点号让准备状态显现，不必大动干戈。", paragraphs: ["如果后面的任务比当前基准更可做，你就给它打点。最后一个点就是先做的事。", "你不是给整个人生排序，只是一次注意一个偏好。这很小，也正因为小才有用。"] },
      { heading: "Dotlist 让仪式保持清楚。", paragraphs: ["Dotlist 保留一份清单、扫描和最后一点先做的规则，不把 FVP 变成仪表盘盛会。", "如果工具说要减少摩擦，就不该再创造一种叫维护工具的新工作。"] },
    ],
  },
  "zh-hant": {
    title: "Final Version Perfected 真正解決了什麼",
    excerpt: "FVP 不是激勵技巧。它是在真實清單中做選擇，而不是假裝每件事都有整齊的優先級。",
    seoTitle: "什麼是 Final Version Perfected？FVP 清晰指南",
    seoDescription: "實用解釋 Mark Forster 的 Final Version Perfected 方法、打點為什麼有效，以及 Dotlist 如何支持這個習慣。",
    tags: ["Final Version Perfected", "任務選擇", "生產力"],
    sections: [
      { heading: "問題不是清單，而是圍繞清單的爭論。", paragraphs: ["許多系統要求你先決定最重要的事，卻不管你此刻能否面對它。聽起來合理，到了週一早上就不一定了。", "FVP 從更溫和的假設開始：心理準備很重要。你保留一份長清單，然後問：我更想做哪件事？"] },
      { heading: "點號讓準備狀態顯現，不必大動干戈。", paragraphs: ["如果後面的任務比目前基準更可做，你就給它打點。最後一個點就是先做的事。", "你不是給整個人生排序，只是一次注意一個偏好。這很小，也正因為小才有用。"] },
      { heading: "Dotlist 讓儀式保持清楚。", paragraphs: ["Dotlist 保留一份清單、掃描和最後一點先做的規則，不把 FVP 變成儀表板盛會。", "如果工具說要減少摩擦，就不該再創造一種叫維護工具的新工作。"] },
    ],
  },
  hi: {
    title: "Final Version Perfected सच में क्या ठीक करता है",
    excerpt: "FVP कोई प्रेरणा-ट्रिक नहीं है। यह असली सूची से चुनने का तरीका है, बिना यह दिखाए कि हर काम की साफ प्राथमिकता है।",
    seoTitle: "Final Version Perfected क्या है? FVP की साफ गाइड",
    seoDescription: "Mark Forster की Final Version Perfected पद्धति, बिंदु लगाने का कारण और Dotlist की भूमिका का व्यावहारिक परिचय।",
    tags: ["Final Version Perfected", "कार्य चयन", "उत्पादकता"],
    sections: [
      { heading: "समस्या सूची नहीं, सूची के आसपास की बहस है।", paragraphs: ["अधिकतर सिस्टम आपसे पहले सबसे जरूरी काम तय करवाते हैं, जबकि आपको यह भी नहीं पता होता कि अभी किस काम का सामना कर सकते हैं। सोमवार सुबह यह खास मददगार नहीं लगता।", "FVP नरम मान्यता से शुरू होता है: तैयारी मायने रखती है। आप एक लंबी सूची रखते हैं और पूछते हैं: मैं इससे ज़्यादा क्या करना चाहता हूं?"] },
      { heading: "बिंदु तैयारी दिखाते हैं, नाटक नहीं बनाते।", paragraphs: ["अगर नीचे का काम वर्तमान मानक से ज़्यादा संभव लगे, आप उस पर बिंदु लगाते हैं। आखिरी बिंदु पहला काम बनता है।", "आप पूरी जिंदगी को रैंक नहीं कर रहे। आप एक बार में एक पसंद देख रहे हैं। यही छोटी बात कठिन दिनों में काम आती है।"] },
      { heading: "Dotlist इस रीति को साफ रखता है।", paragraphs: ["Dotlist एक सूची, स्कैन और आखिरी-बिंदु-पहले नियम को संभालता है। यह FVP को डैशबोर्ड उत्सव नहीं बनाता।", "जो उपकरण घर्षण कम करने का दावा करे, उसे टूल-मेंटेनेंस नाम का दूसरा काम नहीं बनाना चाहिए।"] },
    ],
  },
};

const articleTwo: Record<LocaleCode, ArticleTranslation> = {
  en: {
    title: "Why One Long List Can Feel Lighter Than Five Perfect Boards",
    excerpt: "A single list looks primitive until you notice how much energy modern planning tools spend asking you to classify your anxiety.",
    seoTitle: "One Long To-Do List vs Productivity Boards: Why Simple Works",
    seoDescription: "Learn why one long task list can reduce friction, support realistic task selection, and help knowledge workers start sooner.",
    tags: ["to-do list", "deep work", "work design"],
    sections: [
      { heading: "Categories feel tidy. They also create extra decisions.", paragraphs: ["Boards, labels, areas, statuses, and horizons can be useful when many people coordinate. Alone, they often become a tiny bureaucracy with nice icons.", "One long list removes a class of decisions. You do not need to ask where a task belongs before you are allowed to write it down."] },
      { heading: "A long list is honest about mental weather.", paragraphs: ["Some days you can write the proposal. Some days you can only rename the file and clear the small admin item that has been staring at you for three weeks.", "That does not make you lazy. It means work selection is partly emotional, partly contextual, and only partly rational. FVP gives that fact a humane shape."] },
      { heading: "Simple is not the same as shallow.", paragraphs: ["A single list still needs discipline: capture clearly, avoid duplicates, finish or put back deliberately. The simplicity is a constraint, not a shrug.", "Dotlist leans into that constraint. It gives you enough structure to move without asking you to become the unpaid operations manager of your own nervous system."] },
    ],
  },
  fr: {
    title: "Pourquoi une longue liste peut sembler plus légère que cinq tableaux parfaits",
    excerpt: "Une liste unique paraît primitive jusqu'à ce que l'on voie l'énergie dépensée à classer son anxiété.",
    seoTitle: "Liste unique ou tableaux productivité : pourquoi le simple marche",
    seoDescription: "Découvrez pourquoi une longue liste réduit la friction, soutient un choix réaliste et aide à commencer plus vite.",
    tags: ["liste de tâches", "travail profond", "organisation"],
    sections: [
      { heading: "Les catégories rassurent, mais ajoutent des décisions.", paragraphs: ["Tableaux, étiquettes, statuts et horizons aident parfois les équipes. Seul, cela devient vite une petite bureaucratie avec de jolis pictogrammes.", "Une longue liste retire une décision entière : vous n'avez pas besoin de savoir où ranger une tâche pour l'écrire."] },
      { heading: "La longue liste respecte la météo mentale.", paragraphs: ["Certains jours on écrit la proposition. D'autres, on renomme le fichier et on règle la petite tâche qui nous regarde depuis trois semaines.", "Ce n'est pas de la paresse. Le choix du travail est émotionnel, contextuel et seulement en partie rationnel. FVP lui donne une forme humaine."] },
      { heading: "Simple ne veut pas dire superficiel.", paragraphs: ["Une seule liste demande tout de même de la discipline : capturer clairement, éviter les doublons, finir ou remettre volontairement.", "Dotlist assume cette contrainte. Il donne assez de structure pour avancer sans devenir le gestionnaire bénévole de son système nerveux."] },
    ],
  },
  de: {
    title: "Warum eine lange Liste leichter sein kann als fünf perfekte Boards",
    excerpt: "Eine Einzelliste wirkt primitiv, bis man merkt, wie viel Energie moderne Tools fürs Klassifizieren von Sorge verlangen.",
    seoTitle: "Eine To-do-Liste statt Produktivitätsboards: Warum einfach wirkt",
    seoDescription: "Warum eine lange Aufgabenliste Reibung senkt, realistische Auswahl unterstützt und Wissensarbeitern schnelleres Anfangen erleichtert.",
    tags: ["To-do-Liste", "Deep Work", "Arbeitsgestaltung"],
    sections: [
      { heading: "Kategorien wirken ordentlich und erzeugen Zusatzentscheidungen.", paragraphs: ["Boards, Labels, Bereiche und Status helfen Teams. Allein werden sie oft zu einer kleinen Bürokratie mit hübschen Symbolen.", "Eine lange Liste entfernt eine Entscheidung: Man muss nicht wissen, wohin eine Aufgabe gehört, bevor man sie notiert."] },
      { heading: "Eine lange Liste nimmt mentale Wetterlagen ernst.", paragraphs: ["Manche Tage tragen den Vorschlag. Andere Tage tragen nur das Umbenennen einer Datei und eine kleine Admin-Sache.", "Das ist keine Faulheit. Arbeitsauswahl ist emotional, kontextuell und nur teilweise rational. FVP gibt dem eine menschliche Form."] },
      { heading: "Einfach ist nicht oberflächlich.", paragraphs: ["Eine Liste braucht Disziplin: klar erfassen, Dubletten vermeiden, bewusst abschließen oder zurücklegen.", "Dotlist nutzt diese Grenze. Es gibt genug Struktur, ohne Sie zum unbezahlten Betriebsleiter des eigenen Nervensystems zu machen."] },
    ],
  },
  es: {
    title: "Por qué una lista larga puede pesar menos que cinco tableros perfectos",
    excerpt: "Una lista única parece primitiva hasta que notas cuánta energía gastan las herramientas modernas clasificando ansiedad.",
    seoTitle: "Una lista larga vs tableros de productividad: por qué funciona",
    seoDescription: "Por qué una lista larga reduce fricción, apoya una selección realista y ayuda a empezar antes.",
    tags: ["lista de tareas", "trabajo profundo", "diseño del trabajo"],
    sections: [
      { heading: "Las categorías ordenan, pero también añaden decisiones.", paragraphs: ["Tableros, etiquetas, estados y horizontes ayudan en equipos. A solas pueden volverse una pequeña burocracia con iconos bonitos.", "Una lista larga elimina una decisión: no necesitas saber dónde vive una tarea para escribirla."] },
      { heading: "La lista larga respeta el clima mental.", paragraphs: ["Hay días para redactar la propuesta. Hay días para renombrar el archivo y cerrar ese trámite pequeño que lleva semanas mirando.", "No es pereza. Elegir trabajo es emocional, contextual y solo parcialmente racional. FVP le da una forma humana."] },
      { heading: "Simple no significa superficial.", paragraphs: ["Una lista requiere disciplina: capturar claro, evitar duplicados, terminar o devolver con intención.", "Dotlist acepta esa restricción. Da estructura suficiente para moverte sin convertirte en gerente gratuito de tu sistema nervioso."] },
    ],
  },
  it: {
    title: "Perché una lunga lista può pesare meno di cinque board perfette",
    excerpt: "Una lista unica sembra primitiva finché noti quanta energia spendono gli strumenti moderni per classificare l'ansia.",
    seoTitle: "Lista unica o board di produttività: perché il semplice funziona",
    seoDescription: "Perché una lunga lista riduce attrito, sostiene scelte realistiche e aiuta chi lavora con la conoscenza a iniziare prima.",
    tags: ["lista attività", "deep work", "design del lavoro"],
    sections: [
      { heading: "Le categorie sembrano ordinate, ma creano decisioni.", paragraphs: ["Board, etichette, stati e orizzonti aiutano i team. Da soli possono diventare una piccola burocrazia con belle icone.", "Una lista lunga elimina una decisione: non devi sapere dove appartiene un compito prima di scriverlo."] },
      { heading: "La lunga lista rispetta il meteo mentale.", paragraphs: ["Ci sono giorni da proposta. E giorni in cui basta rinominare il file e chiudere la piccola incombenza che ti guarda da settimane.", "Non è pigrizia. La scelta del lavoro è emotiva, contestuale e solo in parte razionale. FVP le dà una forma umana."] },
      { heading: "Semplice non significa superficiale.", paragraphs: ["Una lista richiede disciplina: catturare bene, evitare duplicati, finire o rimettere indietro con intenzione.", "Dotlist usa quel vincolo. Offre struttura sufficiente senza farti diventare manager gratuito del tuo sistema nervoso."] },
    ],
  },
  "pt-br": {
    title: "Por que uma lista longa pode ser mais leve que cinco quadros perfeitos",
    excerpt: "Uma lista única parece primitiva até você perceber quanta energia ferramentas modernas gastam classificando ansiedade.",
    seoTitle: "Lista única vs quadros de produtividade: por que o simples funciona",
    seoDescription: "Por que uma lista longa reduz atrito, apoia escolhas realistas e ajuda trabalhadores do conhecimento a começar antes.",
    tags: ["lista de tarefas", "trabalho profundo", "desenho do trabalho"],
    sections: [
      { heading: "Categorias parecem arrumadas, mas criam decisões extras.", paragraphs: ["Quadros, etiquetas, status e horizontes ajudam equipes. Sozinho, isso vira uma pequena burocracia com ícones bonitos.", "Uma lista longa remove uma decisão: você não precisa saber onde a tarefa mora antes de anotá-la."] },
      { heading: "A lista longa respeita o clima mental.", paragraphs: ["Há dias de escrever a proposta. Há dias de só renomear o arquivo e matar a tarefa pequena que encara você há semanas.", "Isso não é preguiça. Escolher trabalho é emocional, contextual e só em parte racional. FVP dá forma humana a isso."] },
      { heading: "Simples não é raso.", paragraphs: ["Uma lista exige disciplina: capturar com clareza, evitar duplicatas, concluir ou recolocar de propósito.", "Dotlist abraça essa restrição. Dá estrutura suficiente sem transformar você no gerente gratuito do próprio sistema nervoso."] },
    ],
  },
  nl: {
    title: "Waarom één lange lijst lichter kan voelen dan vijf perfecte borden",
    excerpt: "Een enkele lijst lijkt primitief tot je ziet hoeveel energie moderne planningstools vragen om je onrust te classificeren.",
    seoTitle: "Eén lange takenlijst versus productiviteitsborden",
    seoDescription: "Waarom één lange takenlijst wrijving verlaagt, realistische taakkeuze steunt en kenniswerkers sneller laat beginnen.",
    tags: ["takenlijst", "diep werk", "werkontwerp"],
    sections: [
      { heading: "Categorieën voelen netjes, maar voegen beslissingen toe.", paragraphs: ["Borden, labels, gebieden en statussen helpen teams. Alleen worden ze snel een kleine bureaucratie met leuke iconen.", "Eén lange lijst haalt een beslissing weg: je hoeft niet te weten waar een taak hoort voordat je die opschrijft."] },
      { heading: "Een lange lijst is eerlijk over mentaal weer.", paragraphs: ["Soms schrijf je het voorstel. Soms hernoem je alleen het bestand en doe je dat kleine klusje dat al weken kijkt.", "Dat is geen luiheid. Werk kiezen is emotioneel, contextueel en maar deels rationeel. FVP geeft dat een menselijke vorm."] },
      { heading: "Simpel is niet oppervlakkig.", paragraphs: ["Eén lijst vraagt discipline: helder vastleggen, dubbels vermijden, bewust afronden of terugzetten.", "Dotlist gebruikt die beperking. Het geeft genoeg structuur zonder je de onbetaalde manager van je zenuwstelsel te maken."] },
    ],
  },
  ko: {
    title: "하나의 긴 목록이 다섯 개의 완벽한 보드보다 가벼운 이유",
    excerpt: "하나의 목록은 원시적으로 보이지만, 현대 도구가 불안을 분류하는 데 쓰게 만드는 에너지를 보면 달라집니다.",
    seoTitle: "긴 할 일 목록 vs 생산성 보드: 단순함이 작동하는 이유",
    seoDescription: "긴 작업 목록이 마찰을 줄이고 현실적인 선택을 돕고 더 빨리 시작하게 만드는 이유.",
    tags: ["할 일 목록", "딥워크", "업무 설계"],
    sections: [
      { heading: "분류는 깔끔하지만 결정을 더 만듭니다.", paragraphs: ["보드, 라벨, 상태는 팀에는 유용합니다. 혼자 쓸 때는 예쁜 아이콘이 달린 작은 관료제가 되기 쉽습니다.", "긴 목록은 결정을 하나 줄입니다. 작업을 적기 전에 어디에 넣을지 알 필요가 없습니다."] },
      { heading: "긴 목록은 마음의 날씨를 인정합니다.", paragraphs: ["어떤 날은 제안서를 씁니다. 어떤 날은 파일 이름을 바꾸고 몇 주째 눈에 밟히던 작은 일을 처리합니다.", "게으름이 아닙니다. 일 선택은 감정적이고 상황적이며 부분적으로만 합리적입니다. FVP는 그 사실에 사람다운 형태를 줍니다."] },
      { heading: "단순함은 얕음이 아닙니다.", paragraphs: ["하나의 목록에도 규율은 필요합니다. 분명히 적고, 중복을 피하고, 끝내거나 의도적으로 되돌립니다.", "Dotlist는 그 제약을 받아들입니다. 신경계의 무급 운영자가 되지 않을 만큼의 구조만 제공합니다."] },
    ],
  },
  ja: {
    title: "ひとつの長いリストが五つの完璧なボードより軽い理由",
    excerpt: "単一のリストは原始的に見えます。しかし現代の計画ツールが不安の分類に使わせる力を見ると印象が変わります。",
    seoTitle: "長い ToDo リストと生産性ボード：シンプルが効く理由",
    seoDescription: "一つの長いタスクリストが摩擦を減らし、現実的な選択を支え、早く始める助けになる理由。",
    tags: ["ToDoリスト", "深い仕事", "仕事設計"],
    sections: [
      { heading: "カテゴリーは整って見えますが、決定を増やします。", paragraphs: ["ボード、ラベル、状態はチームには役立ちます。一人では、きれいなアイコン付きの小さな官僚制になりがちです。", "長いリストは決定をひとつ減らします。書く前にタスクの置き場所を決めなくていいのです。"] },
      { heading: "長いリストは心の天気に正直です。", paragraphs: ["提案書を書ける日もあります。ファイル名を直し、小さな事務作業を片づけるだけの日もあります。", "怠けではありません。仕事選びは感情的で文脈的で、合理だけではありません。FVP はそこに人間的な形を与えます。"] },
      { heading: "シンプルは浅いという意味ではありません。", paragraphs: ["一つのリストにも規律は必要です。明確に書き、重複を避け、終えるか意識して戻す。", "Dotlist はその制約を活かします。自分の神経系の無給マネージャーにならずに動けるだけの構造を渡します。"] },
    ],
  },
  "zh-hans": {
    title: "为什么一份长清单可能比五个完美看板更轻",
    excerpt: "单一清单看起来很原始，直到你发现现代计划工具让你花多少力气给焦虑分类。",
    seoTitle: "一份长待办清单 vs 生产力看板：为什么简单有效",
    seoDescription: "了解一份长任务清单如何减少摩擦、支持现实选择，并帮助知识工作者更快开始。",
    tags: ["待办清单", "深度工作", "工作设计"],
    sections: [
      { heading: "分类让人安心，也会制造额外决定。", paragraphs: ["看板、标签、领域和状态对团队有用。一个人使用时，它们常常变成带漂亮图标的小官僚系统。", "长清单去掉一类决定：你不用先知道任务属于哪里，才可以把它写下来。"] },
      { heading: "长清单承认心理天气。", paragraphs: ["有些日子你能写提案。有些日子只能改文件名，处理那个盯着你三周的小杂事。", "这不是懒。工作选择有情绪、有情境，也只有一部分是理性的。FVP 给这个事实一个人性化的形状。"] },
      { heading: "简单不等于浅。", paragraphs: ["一份清单仍需要纪律：清楚记录、避免重复、完成或有意放回。", "Dotlist 接受这个约束。它给你足够结构去行动，却不要求你当自己神经系统的免费运营经理。"] },
    ],
  },
  "zh-hant": {
    title: "為什麼一份長清單可能比五個完美看板更輕",
    excerpt: "單一清單看起來很原始，直到你發現現代計畫工具讓你花多少力氣給焦慮分類。",
    seoTitle: "一份長待辦清單 vs 生產力看板：為什麼簡單有效",
    seoDescription: "了解一份長任務清單如何減少摩擦、支持現實選擇，並幫助知識工作者更快開始。",
    tags: ["待辦清單", "深度工作", "工作設計"],
    sections: [
      { heading: "分類讓人安心，也會製造額外決定。", paragraphs: ["看板、標籤、領域和狀態對團隊有用。一個人使用時，它們常常變成帶漂亮圖示的小官僚系統。", "長清單去掉一類決定：你不用先知道任務屬於哪裡，才可以把它寫下來。"] },
      { heading: "長清單承認心理天氣。", paragraphs: ["有些日子你能寫提案。有些日子只能改檔名，處理那個盯著你三週的小雜事。", "這不是懶。工作選擇有情緒、有情境，也只有一部分是理性的。FVP 給這個事實一個人性化的形狀。"] },
      { heading: "簡單不等於淺。", paragraphs: ["一份清單仍需要紀律：清楚記錄、避免重複、完成或有意放回。", "Dotlist 接受這個約束。它給你足夠結構去行動，卻不要求你當自己神經系統的免費營運經理。"] },
    ],
  },
  hi: {
    title: "एक लंबी सूची पाँच परफेक्ट बोर्ड से हल्की क्यों लग सकती है",
    excerpt: "एक सूची पुरानी लगती है, जब तक आप नहीं देखते कि आधुनिक उपकरण आपकी चिंता को वर्गीकृत करने में कितनी ऊर्जा लेते हैं।",
    seoTitle: "एक लंबी टू-डू सूची बनाम उत्पादकता बोर्ड: सरल क्यों काम करता है",
    seoDescription: "जानिए कैसे एक लंबी कार्य-सूची घर्षण घटाती है, वास्तविक चयन में मदद करती है और शुरुआत जल्दी कराती है।",
    tags: ["टू-डू सूची", "गहरा काम", "कार्य डिजाइन"],
    sections: [
      { heading: "श्रेणियां साफ लगती हैं, लेकिन फैसले बढ़ाती हैं।", paragraphs: ["बोर्ड, लेबल, स्थिति और क्षेत्र टीमों में मदद कर सकते हैं। अकेले काम करते हुए वे सुंदर आइकन वाली छोटी नौकरशाही बन जाते हैं।", "एक लंबी सूची एक फैसला हटाती है: काम लिखने से पहले यह जानना जरूरी नहीं कि वह किस डिब्बे में जाएगा।"] },
      { heading: "लंबी सूची मानसिक मौसम को मानती है।", paragraphs: ["कुछ दिन प्रस्ताव लिखने के होते हैं। कुछ दिन सिर्फ फाइल का नाम बदलने और तीन हफ्ते से घूर रहे छोटे काम को निपटाने के।", "यह आलस नहीं है। काम चुनना भावनात्मक, संदर्भगत और केवल आंशिक रूप से तर्कसंगत है। FVP इसे मानवीय आकार देता है।"] },
      { heading: "सरल का मतलब उथला नहीं।", paragraphs: ["एक सूची में भी अनुशासन चाहिए: साफ लिखना, दोहराव बचाना, पूरा करना या जानबूझकर वापस रखना।", "Dotlist इसी सीमा को अपनाता है। यह इतना ढांचा देता है कि आप चल सकें, बिना अपने ही तंत्रिका-तंत्र के मुफ्त मैनेजर बने।"] },
    ],
  },
};

export const articles: Article[] = [
  {
    slug: "what-final-version-perfected-fixes",
    date: "2026-05-13",
    authorId: "soyoung-kang",
    readingMinutes: 4,
    translations: articleOne,
  },
  {
    slug: "one-long-list-productivity",
    date: "2026-05-13",
    authorId: "luke-mccann",
    readingMinutes: 4,
    translations: articleTwo,
  },
];

export function getArticles(locale: LocaleCode): Array<Article & { translation: ArticleTranslation }> {
  return articles.map((article) => ({
    ...article,
    translation: article.translations[locale] ?? article.translations[defaultLocale],
  }));
}

export function getArticle(slug: string, locale: LocaleCode): (Article & { translation: ArticleTranslation }) | null {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return {
    ...article,
    translation: article.translations[locale] ?? article.translations[defaultLocale],
  };
}

export function getArticleStaticParams() {
  return articles.flatMap((article) =>
    Object.keys(article.translations).map((lang) => ({
      lang,
      slug: article.slug,
    })),
  );
}

