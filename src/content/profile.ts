// Fonte única do portfólio: o site e os vídeos Remotion leem daqui.
export type L = { pt: string; en: string };
export type Lang = "pt" | "en";
export const pick = (l: L, lang: Lang) => l[lang];
export const langOf = (locale: string): Lang => (locale === "en" ? "en" : "pt");

export const PROFILE = {
  name: "Caio César Ponte",
  short: "Caio Ponte",
  role: { pt: "Desenvolvedor Front-End & Mobile", en: "Front-End & Mobile Developer" },
  location: "Fortaleza · Ceará · Brasil",
  email: "ccpnexatech@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-cesar-ponte/",
  github: "https://github.com/ccpnexatech",
  photo: "/caio.jpg",
  availability: {
    pt: "Aberto a vagas de Front-End, Mobile ou React Native — remoto ou Fortaleza",
    en: "Open to Front-End, Mobile or React Native roles — remote or Fortaleza",
  },
  pitch: {
    pt: "Construo interfaces web e apps em React Native — da primeira tela à publicação na App Store e no Google Play — e faço a ponte entre o que o negócio pede e o que a engenharia entrega.",
    en: "I build web interfaces and React Native apps — from the first screen to App Store and Google Play release — and bridge what the business asks for with what engineering ships.",
  },
  about: [
    {
      pt: "Sou de Fortaleza e estou há 4 anos em tecnologia na Itarget Tecnologia. Entrei como trainee de TI mapeando processos e organizando documentação. Hoje desenvolvo interfaces web e aplicativos em React Native, cuido das integrações com APIs REST e acompanho o que acontece em produção com Firebase e Microsoft Clarity.",
      en: "I'm from Fortaleza, Brazil, with 4 years in tech at Itarget Tecnologia. I started as an IT trainee mapping processes and organizing documentation. Today I build web interfaces and React Native apps, own REST API integrations and watch production with Firebase and Microsoft Clarity.",
    },
    {
      pt: "Meu diferencial é conversar com as áreas de negócio, entender a regra por trás do pedido e transformar isso em especificação técnica e em produto funcionando. Fora do trabalho, construo projetos completos — SaaS, APIs e ferramentas open source — para testar decisões de engenharia de verdade.",
      en: "My edge is talking to business teams, understanding the rule behind each request and turning it into technical specs and working product. Outside work I build complete projects — SaaS, APIs and open-source tools — to test real engineering decisions.",
    },
  ],
  stats: [
    { value: 4, suffix: "", label: { pt: "anos em tecnologia", en: "years in tech" } },
    { value: 9, suffix: "", label: { pt: "projetos no portfólio", en: "portfolio projects" } },
    { value: 120, suffix: "+", label: { pt: "tarefas de treino de IA", en: "AI training tasks" } },
    { value: 20, suffix: "+", label: { pt: "repositórios no GitHub", en: "GitHub repositories" } },
  ],
};

export type Project = {
  slug: string;
  name: string;
  tagline: L;
  problem: L;
  highlights: L[];
  stack: string[];
  category: "web" | "mobile" | "api" | "tools" | "sites";
  url?: string;
  featured?: boolean;
  status?: L;
  color: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ofix",
    name: "OFIX",
    featured: true,
    category: "web",
    color: "#3D6EF5",
    url: "https://github.com/ccpnexatech/ofix",
    tagline: { pt: "SaaS de ordens de serviço para assistências técnicas", en: "Service-order SaaS for repair shops" },
    problem: {
      pt: "Assistências técnicas controlam ordens de serviço em papel e WhatsApp.",
      en: "Repair shops track service orders on paper and WhatsApp.",
    },
    highlights: [
      { pt: "Multi-tenant com isolamento real: toda query passa por escopo de tenant", en: "Real multi-tenant isolation: every query is tenant-scoped" },
      { pt: "Orçamento aprovado pelo cliente via link, sem login", en: "Customer approves quotes via link, no login" },
      { pt: "CI verde antes de qualquer merge: typecheck, lint e testes", en: "Green CI before any merge: typecheck, lint and tests" },
      { pt: "Decisões registradas em ADR, tour guiado e assistente de IA", en: "Decisions recorded as ADRs, guided tour and AI assistant" },
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "agendaflow",
    name: "AgendaFlow",
    featured: true,
    category: "web",
    color: "#F97316",
    url: "https://github.com/ccpnexatech/sass-agenda-flow",
    tagline: { pt: "Dashboard de agendamentos para salões e clínicas", en: "Scheduling dashboard for salons and clinics" },
    problem: {
      pt: "Pequenos negócios de serviço perdem controle de agenda, clientes e faturamento.",
      en: "Small service businesses lose track of schedule, clients and revenue.",
    },
    highlights: [
      { pt: "Métricas animadas e gráficos em tempo real", en: "Animated metrics and real-time charts" },
      { pt: "CRUD completo com filtros e paginação", en: "Full CRUD with filters and pagination" },
      { pt: "Exportação de CSV gerada no próprio navegador", en: "CSV export generated in the browser" },
      { pt: "Tema dark/light e configurações completas", en: "Dark/light theme and full settings" },
    ],
    stack: ["React", "JavaScript", "Charts", "CSV"],
  },
  {
    slug: "transparenciabr",
    name: "TransparênciaBR",
    featured: true,
    category: "api",
    color: "#22C55E",
    status: { pt: "Beta privado", en: "Private beta" },
    tagline: { pt: "API de inteligência empresarial com dados públicos", en: "Business-intelligence API on Brazilian public data" },
    problem: {
      pt: "Avaliar o risco de uma empresa exige cruzar CNPJ, sócios e licitações em várias fontes.",
      en: "Assessing a company's risk means cross-checking tax IDs, partners and tenders across many sources.",
    },
    highlights: [
      { pt: "Uma chamada: cadastro, contratos federais e score de risco explicado", en: "One call: registry, federal contracts and explained risk score" },
      { pt: "Cache com fallback e circuit breaker em todas as integrações", en: "Cache with fallback and circuit breaker on every integration" },
      { pt: "Swagger automático e rate limiting por IP", en: "Auto Swagger docs and per-IP rate limiting" },
    ],
    stack: ["Java 21", "Spring Boot 3", "WebFlux", "Redis", "PostgreSQL"],
  },
  {
    slug: "apps",
    name: "Apps Itarget",
    category: "mobile",
    color: "#A855F7",
    tagline: { pt: "Aplicativos publicados na App Store e no Google Play", en: "Apps published on the App Store and Google Play" },
    problem: {
      pt: "Apps white-label para entidades e eventos, mantidos e publicados pelo time.",
      en: "White-label apps for organizations and events, maintained and released by the team.",
    },
    highlights: [
      { pt: "React Native da implementação à publicação nas lojas", en: "React Native from implementation to store release" },
      { pt: "Migração da API legada para a nova com contingência", en: "Legacy-to-new API migration with fallback" },
      { pt: "Firebase e Microsoft Clarity para diagnóstico em produção", en: "Firebase and Microsoft Clarity for production diagnosis" },
    ],
    stack: ["React Native", "TypeScript", "Firebase", "Clarity"],
  },
  {
    slug: "fidc",
    name: "fidc-onboarding-cedente",
    category: "api",
    color: "#0EA5E9",
    url: "https://github.com/ccpnexatech/fidc-onboarding-cedente",
    status: { pt: "Em andamento", en: "In progress" },
    tagline: { pt: "Onboarding de cedentes em FIDC, do discovery à API homologada", en: "FIDC assignor onboarding, from discovery to approved API" },
    problem: {
      pt: "Remessas de recebíveis mal especificadas viram retrabalho entre operação e TI.",
      en: "Poorly specified receivables files become rework between ops and IT.",
    },
    highlights: [
      { pt: "Histórias em Gherkin e contrato OpenAPI", en: "Gherkin stories and OpenAPI contract" },
      { pt: "Postman/Newman rodando no CI", en: "Postman/Newman running in CI" },
    ],
    stack: ["TypeScript", "OpenAPI", "Gherkin", "Newman"],
  },
  {
    slug: "leadflow",
    name: "LeadFlow",
    category: "tools",
    color: "#EAB308",
    url: "https://github.com/ccpnexatech/leadflow",
    tagline: { pt: "Geração gratuita de leads para prospecção no LinkedIn", en: "Free lead generation for LinkedIn prospecting" },
    problem: {
      pt: "Achar o decisor certo na empresa certa leva tempo demais.",
      en: "Finding the right decision-maker at the right company takes too long.",
    },
    highlights: [
      { pt: "Brave Search API, resultado em CSV", en: "Brave Search API, CSV output" },
      { pt: "Open source, sem login e sem guardar dados", en: "Open source, no login, no stored data" },
    ],
    stack: ["JavaScript", "Brave Search API"],
  },
  {
    slug: "guia-ativacao",
    name: "Guia de Ativação",
    category: "tools",
    color: "#14B8A6",
    tagline: { pt: "Ficha PDF → YAML → guia passo a passo de ativação de apps", en: "PDF form → YAML → step-by-step app activation guide" },
    problem: {
      pt: "Ativar um app dependia da memória de poucas pessoas.",
      en: "Activating an app depended on a few people's memory.",
    },
    highlights: [
      { pt: "Ficha PDF preenchível + importador que valida e gera YAML", en: "Fillable PDF + importer that validates and outputs YAML" },
      { pt: "Guias gerados automaticamente, com instalador e janela", en: "Auto-generated guides, with installer and GUI" },
    ],
    stack: ["Python", "YAML", "LaTeX", "Jinja2"],
  },
  {
    slug: "votoclaro",
    name: "VotoClaro",
    category: "tools",
    color: "#EC4899",
    url: "https://github.com/ccpnexatech/votoclaro",
    tagline: { pt: "Dados políticos abertos, legíveis para qualquer pessoa", en: "Open political data anyone can read" },
    problem: { pt: "Dados públicos existem, mas são difíceis de ler.", en: "Public data exists but is hard to read." },
    highlights: [{ pt: "Coleta e tratamento de dados abertos", en: "Open-data collection and processing" }],
    stack: ["Python"],
  },
  {
    slug: "templates",
    name: "Templates de sites",
    category: "sites",
    color: "#64748B",
    url: "https://github.com/ccpnexatech?tab=repositories",
    tagline: { pt: "7 templates + sites de clínica, restaurante e conversão", en: "7 templates + clinic, restaurant and landing sites" },
    problem: {
      pt: "Negócios locais precisam de presença digital rápida e bem feita.",
      en: "Local businesses need fast, well-built web presence.",
    },
    highlights: [
      { pt: "Negócio local, restaurante, autônomo, creator, portfólio e evento", en: "Local business, restaurant, freelancer, creator, portfolio and event" },
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
];

export const EXPERIENCE = [
  {
    role: { pt: "Desenvolvedor Front-End & Mobile", en: "Front-End & Mobile Developer" },
    org: "Itarget Tecnologia",
    period: { pt: "jul/2024 — atual", en: "Jul 2024 — present" },
    place: { pt: "Fortaleza · Híbrido", en: "Fortaleza · Hybrid" },
    points: [
      { pt: "Interfaces web e apps em React Native, da implementação à publicação nas lojas", en: "Web interfaces and React Native apps, from implementation to store release" },
      { pt: "Migração da API legada para a nova: endpoints mapeados, erros tratados, contingência", en: "Legacy-to-new API migration: mapped endpoints, error handling, fallback" },
      { pt: "Integrações com APIs financeiras e de IA", en: "Financial and AI API integrations" },
      { pt: "Firebase e Microsoft Clarity para comportamento do usuário e diagnóstico", en: "Firebase and Microsoft Clarity for user behavior and diagnosis" },
      { pt: "Discovery com o negócio → especificação técnica e critérios de aceite", en: "Business discovery → technical specs and acceptance criteria" },
      { pt: "Capacitação interna, mentoria e cultura de code review", en: "Internal training, mentoring and code-review culture" },
    ],
  },
  {
    role: { pt: "Treinador de IA (Freelance)", en: "AI Trainer (Freelance)" },
    org: "Outlier AI",
    period: { pt: "abr/2024 — mar/2025", en: "Apr 2024 — Mar 2025" },
    place: { pt: "Remoto", en: "Remote" },
    points: [
      { pt: "+120 tarefas de treinamento supervisionado (SFT) de modelos de linguagem", en: "120+ supervised fine-tuning (SFT) tasks for language models" },
      { pt: "Avaliação de respostas por qualidade, aderência e factualidade, com diretrizes em inglês", en: "Rated answers for quality, instruction-following and factuality, English guidelines" },
    ],
  },
  {
    role: { pt: "Trainee de TI", en: "IT Trainee" },
    org: "Itarget Tecnologia",
    period: { pt: "jul/2022 — jun/2024", en: "Jul 2022 — Jun 2024" },
    place: { pt: "Fortaleza · Presencial", en: "Fortaleza · On-site" },
    points: [
      { pt: "Mapeamento de processos com métodos ágeis", en: "Process mapping with agile methods" },
      { pt: "Documentação técnica e gestão do conhecimento", en: "Technical documentation and knowledge management" },
      { pt: "Pesquisa de mercado e prototipagem com foco no cliente", en: "Market research and customer-focused prototyping" },
    ],
  },
];

export const EDUCATION = [
  {
    title: { pt: "Ciências Econômicas", en: "Economics" },
    org: { pt: "Graduação em curso", en: "Undergraduate, in progress" },
    note: { pt: "Amplia minha leitura de negócio, custo e impacto.", en: "Broadens my view of business, cost and impact." },
  },
  {
    title: { pt: "Gestão de processos aplicada", en: "Applied process management" },
    org: { pt: "Consultoria Gomes de Matos", en: "Gomes de Matos consultancy" },
    note: { pt: "Formação prática em mapeamento e melhoria de processos.", en: "Hands-on training in process mapping and improvement." },
  },
  {
    title: { pt: "Ensino Médio", en: "High school" },
    org: { pt: "Colégio Christus · 2020", en: "Colégio Christus · 2020" },
    note: { pt: "Fortaleza, CE.", en: "Fortaleza, Brazil." },
  },
  {
    title: { pt: "Idiomas", en: "Languages" },
    org: { pt: "Português nativo · Inglês avançado", en: "Portuguese native · English advanced" },
    note: { pt: "Trabalho com diretrizes e documentação em inglês.", en: "I work daily with English guidelines and docs." },
  },
];

export const SKILL_GROUPS = [
  { key: "front", label: { pt: "Front-end", en: "Front-end" }, items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Framer Motion", "Remotion"] },
  { key: "mobile", label: { pt: "Mobile", en: "Mobile" }, items: ["React Native", "App Store", "Google Play", "Firebase", "Microsoft Clarity"] },
  { key: "back", label: { pt: "APIs & dados", en: "APIs & data" }, items: ["REST APIs", "Node.js", "NestJS", "Java", "Spring Boot", "SQL", "PostgreSQL", "NoSQL", "Redis", "OpenAPI"] },
  { key: "eng", label: { pt: "Engenharia", en: "Engineering" }, items: ["Git", "CI/CD", "Docker", "Code review", "ADR", "Testes automatizados"] },
  { key: "biz", label: { pt: "Produto & negócio", en: "Product & business" }, items: ["Discovery", "Especificação técnica", "Gherkin/BDD", "Scrum", "Kanban", "Mentoria"] },
];

export const GOALS = [
  {
    horizon: { pt: "Agora", en: "Now" },
    title: { pt: "Crescer como dev Front-End & Mobile", en: "Grow as a Front-End & Mobile dev" },
    text: {
      pt: "Entrar num time de produto onde eu possa construir telas e apps em React e React Native com padrão alto de qualidade.",
      en: "Join a product team where I can build screens and apps in React and React Native with a high quality bar.",
    },
  },
  {
    horizon: { pt: "Em evolução", en: "Leveling up" },
    title: { pt: "Qualidade de interface", en: "Interface quality" },
    text: {
      pt: "Testes automatizados no front, acessibilidade, tratamento de erros e estados de loading, e consistência com design system.",
      en: "Front-end automated tests, accessibility, error and loading states, and design-system consistency.",
    },
  },
  {
    horizon: { pt: "Próximos anos", en: "Next years" },
    title: { pt: "Referência técnica que fala negócio", en: "A technical reference who speaks business" },
    text: {
      pt: "Concluir Ciências Econômicas e unir engenharia e leitura de negócio para liderar decisões de produto.",
      en: "Finish my Economics degree and combine engineering with business sense to lead product decisions.",
    },
  },
];
