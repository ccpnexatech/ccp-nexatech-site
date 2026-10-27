// Fonte única do portfólio. O site e os vídeos Remotion leem daqui.
// Regra: nada aqui é inventado — cada fato vem do LinkedIn, do PDI ou dos repositórios.
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
    pt: "Aberto a vagas de Front-End, Mobile ou React Native — remoto ou em Fortaleza.",
    en: "Open to Front-End, Mobile or React Native roles — remote or in Fortaleza.",
  },
};

export type Chapter = {
  n: string;
  years: L;
  title: L;
  lede: L;
  body: L[];
  quote?: { text: L; by: L };
};

export const CHAPTERS: Chapter[] = [
  {
    n: "01",
    years: { pt: "2022 — 2024", en: "2022 — 2024" },
    title: { pt: "Processos e documentação", en: "Processes and documentation" },
    lede: { pt: "Trainee de TI · Itarget Tecnologia", en: "IT Trainee · Itarget Tecnologia" },
    body: [
      {
        pt: "Mapeei processos e demandas de produto com métodos ágeis, identificando gargalos entre as áreas de negócio e o time técnico. Estruturei a documentação técnica e a gestão do conhecimento da empresa.",
        en: "Mapped processes and product requests using agile methods, identifying bottlenecks between business teams and engineering. Structured the company's technical documentation and knowledge management.",
      },
      {
        pt: "Conduzi treinamentos internos e atuei em pesquisa de mercado e prototipagem com foco na experiência do cliente.",
        en: "Ran internal training and worked on market research and customer-focused prototyping.",
      },
    ],
  },
  {
    n: "02",
    years: { pt: "2024 — atual", en: "2024 — present" },
    title: { pt: "Front-end, mobile e integrações", en: "Front-end, mobile and integrations" },
    lede: { pt: "Desenvolvedor Front-End & Mobile · Itarget Tecnologia", en: "Front-End & Mobile Developer · Itarget Tecnologia" },
    body: [
      {
        pt: "Conduzo o discovery com as áreas de negócio e traduzo cada demanda em especificação técnica — endpoints, integrações e critérios de aceite —, usada como contrato entre produto e desenvolvimento.",
        en: "I run discovery with business teams and turn each request into a technical spec — endpoints, integrations and acceptance criteria — used as the contract between product and engineering.",
      },
      {
        pt: "Estruturei a capacitação técnica interna, com materiais, mentoria e padrões documentados, e a cultura de code review do time.",
        en: "I set up internal technical training — materials, mentoring and documented standards — and the team's code-review practice.",
      },
    ],
    quote: {
      text: { pt: "Programa muito bem, sem precisar repetir a orientação.", en: "Codes very well, without needing guidance repeated." },
      by: { pt: "Avaliação da liderança, 2026", en: "Leadership review, 2026" },
    },
  },
  {
    n: "03",
    years: { pt: "2024 — atual", en: "2024 — present" },
    title: { pt: "Apps em produção", en: "Apps in production" },
    lede: { pt: "React Native · App Store e Google Play", en: "React Native · App Store and Google Play" },
    body: [
      {
        pt: "Desenvolvo e mantenho apps em React Native da implementação à publicação nas lojas. Conduzi a migração da API legada para a nova: mapeamento dos endpoints em uso, tratamento de erros e contingência entre sistemas.",
        en: "I build and maintain React Native apps from implementation to store release. I led the legacy-to-new API migration: mapping endpoints in use, error handling and fallback between systems.",
      },
      {
        pt: "Uso Firebase e Microsoft Clarity para monitoramento, análise de comportamento do usuário e diagnóstico de problemas em produção.",
        en: "I use Firebase and Microsoft Clarity for monitoring, user-behavior analysis and production diagnostics.",
      },
    ],
  },
  {
    n: "04",
    years: { pt: "2025 — atual", en: "2025 — present" },
    title: { pt: "Projetos independentes", en: "Independent projects" },
    lede: { pt: "SaaS, APIs e ferramentas open source", en: "SaaS, APIs and open-source tools" },
    body: [
      {
        pt: "Projetos completos com CI, testes e decisões registradas em ADR: um SaaS multi-tenant, uma API com circuit breaker e cache, e ferramentas open source.",
        en: "Complete projects with CI, tests and decisions recorded as ADRs: a multi-tenant SaaS, an API with circuit breaker and cache, and open-source tools.",
      },
    ],
  },
];

// ---------- Bastidores: cada projeto contado de dentro ----------
export type Backstage = {
  slug: string;
  name: string;
  kind: L;
  device: "phone" | "browser";
  color: string;
  url?: string;
  ask: L; // o pedido / problema
  rules: L[]; // regras de negócio que eu precisei entender
  decision: L; // a decisão de engenharia
  code: { file: string; lang: string; src: string; note: L };
  callouts: L[]; // anotações sobre a tela
  outcome: L;
  stack: string[];
};

export const BACKSTAGE: Backstage[] = [
  {
    slug: "apps",
    name: "Apps white-label",
    kind: { pt: "Trabalho · Itarget Tecnologia", en: "Work · Itarget Tecnologia" },
    device: "phone",
    color: "#A8410A",
    ask: {
      pt: "Cada entidade ou evento cliente recebe o seu próprio app nas lojas — e o app precisa continuar funcionando enquanto a API por trás dele é trocada.",
      en: "Each client organization or event gets its own app in the stores — and the app must keep working while the API behind it is replaced.",
    },
    rules: [
      { pt: "Um código base, muitos apps: marca, cores e módulos mudam por cliente.", en: "One codebase, many apps: brand, colors and modules change per client." },
      { pt: "Ativar um app depende de uma ficha completa: dados e imagens no formato que as lojas exigem.", en: "Activating an app depends on a complete form: data and images in the format the stores require." },
      { pt: "A migração não pode derrubar quem já usa: legado e API nova convivem durante a transição.", en: "Migration can't break current users: legacy and new API coexist during the transition." },
    ],
    decision: {
      pt: "Mapear todos os endpoints em uso antes de trocar qualquer um, e encapsular a chamada com fallback para o legado.",
      en: "Map every endpoint in use before replacing any, and wrap calls with a fallback to the legacy API.",
    },
    code: {
      file: "src/api/request.ts",
      lang: "ts",
      note: { pt: "Trecho simplificado do padrão de contingência.", en: "Simplified excerpt of the fallback pattern." },
      src: `type Source = "new" | "legacy";

export async function request<T>(path: string, init?: RequestInit): Promise<{ data: T; source: Source }> {
  try {
    const res = await fetch(\`\${API_NEW}\${path}\`, init);
    if (!res.ok) throw new HttpError(res.status);
    return { data: await res.json(), source: "new" };
  } catch (error) {
    if (!isMigratedEndpoint(path)) throw error; // só cai pro legado onde ele existe
    track("api_fallback", { path, reason: String(error) }); // registra o fallback no Firebase
    const res = await fetch(\`\${API_LEGACY}\${path}\`, init);
    return { data: await res.json(), source: "legacy" };
  }
}`,
    },
    callouts: [
      { pt: "Tema e marca vêm da configuração do cliente", en: "Theme and brand come from client config" },
      { pt: "Estados de carregamento e erro em toda tela", en: "Loading and error states on every screen" },
      { pt: "Eventos no Firebase, sessões no Clarity", en: "Events in Firebase, sessions in Clarity" },
    ],
    outcome: { pt: "Apps publicados na App Store e no Google Play, migração sem parar quem usa.", en: "Apps live on the App Store and Google Play, migrated without stopping users." },
    stack: ["React Native", "TypeScript", "REST", "Firebase", "Clarity"],
  },
  {
    slug: "ofix",
    name: "OFIX",
    kind: { pt: "Projeto pessoal · open source", en: "Personal project · open source" },
    device: "browser",
    color: "#1D4ED8",
    url: "https://github.com/ccpnexatech/ofix",
    ask: {
      pt: "Assistências técnicas controlam ordens de serviço em papel e WhatsApp. O cliente não sabe o status e o orçamento se perde.",
      en: "Repair shops track service orders on paper and WhatsApp. Customers don't know the status and quotes get lost.",
    },
    rules: [
      { pt: "Cada assistência (tenant) tem filiais; nenhum dado pode vazar entre assistências.", en: "Each shop (tenant) has branches; no data may leak between shops." },
      { pt: "O cliente aprova o orçamento por link, sem criar conta.", en: "Customers approve quotes via link, without an account." },
      { pt: "Garantia de 90 dias contada a partir da entrega.", en: "90-day warranty counted from delivery." },
    ],
    decision: {
      pt: "Toda consulta exige o tenant na assinatura, o que garante o isolamento pelo tipo. Valores monetários são inteiros em centavos.",
      en: "Every query requires the tenant in its signature, enforcing isolation through types. Monetary values are integers in cents.",
    },
    code: {
      file: "apps/api/src/orders/orders.repository.ts",
      lang: "ts",
      note: { pt: "Trecho simplificado: o tenant é obrigatório na assinatura.", en: "Simplified excerpt: the tenant is required by the signature." },
      src: `export class OrdersRepository {
  constructor(private readonly db: PrismaService) {}

  // tenantId obrigatório: o isolamento entre clientes é garantido pelo tipo.
  findOpen(tenantId: TenantId, branchId?: BranchId) {
    return this.db.serviceOrder.findMany({
      where: { tenantId, branchId, status: { in: ["OPEN", "WAITING_APPROVAL"] } },
      orderBy: { createdAt: "desc" },
    });
  }

  async approveQuote(tenantId: TenantId, token: ApprovalToken) {
    const quote = await this.db.quote.findUniqueOrThrow({ where: { tenantId_token: { tenantId, token } } });
    if (quote.expiresAt < new Date()) throw new QuoteExpiredError(quote.id);
    return this.db.quote.update({ where: { id: quote.id }, data: { approvedAt: new Date() } });
  }
}`,
    },
    callouts: [
      { pt: "Filial ativa no topo: o escopo fica visível", en: "Active branch on top: scope stays visible" },
      { pt: "Link de aprovação sem login", en: "Login-free approval link" },
      { pt: "Tour guiado para o primeiro acesso", en: "Guided tour for first access" },
    ],
    outcome: { pt: "CI verde antes de qualquer merge: typecheck, lint e testes. Decisões registradas em ADR.", en: "Green CI before any merge: typecheck, lint and tests. Decisions recorded as ADRs." },
    stack: ["Next.js", "NestJS", "PostgreSQL", "TypeScript strict"],
  },
  {
    slug: "agendaflow",
    name: "AgendaFlow",
    kind: { pt: "Projeto pessoal · SaaS", en: "Personal project · SaaS" },
    device: "browser",
    color: "#0F766E",
    url: "https://github.com/ccpnexatech/sass-agenda-flow",
    ask: {
      pt: "Salões e clínicas perdem o controle da agenda, de quem é cliente fiel e de quanto entrou no mês.",
      en: "Salons and clinics lose track of the schedule, loyal clients and monthly revenue.",
    },
    rules: [
      { pt: "Um serviço tem preço, duração e cor — a agenda nasce disso.", en: "A service has price, duration and color — the schedule is built from that." },
      { pt: "O histórico do cliente soma visitas e faturamento.", en: "Client history sums visits and revenue." },
    ],
    decision: {
      pt: "Exportar CSV direto no navegador: sem servidor, sem fila, e o dado nunca sai da máquina de quem exporta.",
      en: "Export CSV right in the browser: no server, no queue, and the data never leaves the exporter's machine.",
    },
    code: {
      file: "src/features/reports/exportCsv.ts",
      lang: "ts",
      note: { pt: "Trecho simplificado da exportação no cliente.", en: "Simplified client-side export." },
      src: `const escape = (v: unknown) => \`"\${String(v ?? "").replaceAll('"', '""')}"\`;

export function exportCsv<T extends object>(rows: T[], columns: Column<T>[], filename: string) {
  const header = columns.map((c) => escape(c.label)).join(";");
  const body = rows.map((r) => columns.map((c) => escape(c.value(r))).join(";"));
  const blob = new Blob(["\\uFEFF" + [header, ...body].join("\\n")], { type: "text/csv;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url); // BOM + ";" abrem certo no Excel em pt-BR
}`,
    },
    callouts: [
      { pt: "Métricas animadas no dashboard", en: "Animated dashboard metrics" },
      { pt: "Filtros e paginação no CRUD", en: "Filters and pagination in CRUD" },
      { pt: "Tema claro e escuro", en: "Light and dark theme" },
    ],
    outcome: { pt: "Dashboard completo com relatórios exportáveis e configurações de horário e notificação.", en: "Full dashboard with exportable reports and schedule/notification settings." },
    stack: ["React", "JavaScript", "Charts"],
  },
  {
    slug: "transparenciabr",
    name: "TransparênciaBR",
    kind: { pt: "Projeto pessoal · API em beta", en: "Personal project · API in beta" },
    device: "browser",
    color: "#15803D",
    ask: {
      pt: "Avaliar o risco de uma empresa exige cruzar CNPJ, sócios e licitações em várias fontes, cada uma com autenticação e falhas próprias.",
      en: "Assessing a company's risk means cross-checking tax ID, partners and tenders across sources, each with its own auth and failures.",
    },
    rules: [
      { pt: "Uma chamada devolve cadastro, contratos federais e um score de risco.", en: "One call returns registry, federal contracts and a risk score." },
      { pt: "Todo score precisa explicar seus fatores.", en: "Every score must explain its factors." },
    ],
    decision: {
      pt: "Fonte externa fora do ar não pode derrubar a API: circuit breaker em cada integração e cache como fallback.",
      en: "An external source going down can't take the API down: circuit breaker on each integration and cache as fallback.",
    },
    code: {
      file: "src/main/java/.../CnpjClient.java",
      lang: "java",
      note: { pt: "Trecho simplificado com Resilience4j.", en: "Simplified excerpt with Resilience4j." },
      src: `@CircuitBreaker(name = "cnpjws", fallbackMethod = "fromCache")
public Mono<Company> fetch(String cnpj) {
    return webClient.get().uri("/cnpj/{cnpj}", cnpj)
        .retrieve()
        .bodyToMono(Company.class)
        .doOnNext(c -> cache.put(cnpj, c));
}

private Mono<Company> fromCache(String cnpj, Throwable cause) {
    return Mono.justOrEmpty(cache.get(cnpj))
        .map(c -> c.withStale(true)); // o cliente sabe que o dado é do cache
}`,
    },
    callouts: [
      { pt: "Swagger gerado automaticamente", en: "Auto-generated Swagger" },
      { pt: "Rate limiting por IP", en: "Per-IP rate limiting" },
      { pt: "Score com fatores explicados", en: "Score with explained factors" },
    ],
    outcome: { pt: "Beta privado aberto com 50 vagas de acesso completo.", en: "Private beta opened with 50 full-access seats." },
    stack: ["Java 21", "Spring Boot 3", "WebFlux", "Redis", "Resilience4j"],
  },
];

// ---------- Todos os projetos ----------
export type Project = { name: string; desc: L; stack: string; url?: string; tag: L };
export const ALL_PROJECTS: Project[] = [
  { name: "OFIX", desc: { pt: "SaaS multi-tenant de ordens de serviço", en: "Multi-tenant service-order SaaS" }, stack: "Next.js · NestJS · PostgreSQL", url: "https://github.com/ccpnexatech/ofix", tag: { pt: "web", en: "web" } },
  { name: "AgendaFlow", desc: { pt: "Dashboard de agendamentos", en: "Scheduling dashboard" }, stack: "React · Charts", url: "https://github.com/ccpnexatech/sass-agenda-flow", tag: { pt: "web", en: "web" } },
  { name: "TransparênciaBR", desc: { pt: "API de inteligência com dados públicos", en: "Public-data intelligence API" }, stack: "Java · Spring · Redis", tag: { pt: "api", en: "api" } },
  { name: "fidc-onboarding-cedente", desc: { pt: "Onboarding de cedentes em FIDC, do discovery à API", en: "FIDC assignor onboarding, discovery to API" }, stack: "OpenAPI · Gherkin · Newman", url: "https://github.com/ccpnexatech/fidc-onboarding-cedente", tag: { pt: "api", en: "api" } },
  { name: "Guia de Ativação", desc: { pt: "Ficha PDF → YAML → guia passo a passo", en: "PDF form → YAML → step-by-step guide" }, stack: "Python · YAML · LaTeX", tag: { pt: "automação", en: "automation" } },
  { name: "LeadFlow", desc: { pt: "Leads para prospecção no LinkedIn, open source", en: "Open-source LinkedIn prospecting leads" }, stack: "JavaScript · Brave Search API", url: "https://github.com/ccpnexatech/leadflow", tag: { pt: "ferramenta", en: "tool" } },
  { name: "VotoClaro", desc: { pt: "Dados políticos abertos, legíveis", en: "Readable open political data" }, stack: "Python", url: "https://github.com/ccpnexatech/votoclaro", tag: { pt: "dados", en: "data" } },
  { name: "Este portfólio", desc: { pt: "Next.js + Remotion, com barra de acessibilidade", en: "Next.js + Remotion, with accessibility bar" }, stack: "Next.js · Remotion · Tailwind", url: "https://github.com/ccpnexatech/ccp-nexatech-site", tag: { pt: "web", en: "web" } },
  { name: "Templates de sites", desc: { pt: "7 templates + sites de clínica e restaurante", en: "7 templates + clinic and restaurant sites" }, stack: "HTML · CSS · JS", url: "https://github.com/ccpnexatech?tab=repositories", tag: { pt: "sites", en: "sites" } },
];

// ---------- Dia a dia ----------
export const DAILY = [
  { when: { pt: "Manhã", en: "Morning" }, what: { pt: "Revisão de Firebase e Clarity: erros recentes e sessões com fricção.", en: "Firebase and Clarity review: recent errors and sessions with friction." }, tools: ["Firebase", "Microsoft Clarity"] },
  { when: { pt: "Discovery", en: "Discovery" }, what: { pt: "Alinhamento com a área de negócio: regra documentada e critérios de aceite definidos.", en: "Alignment with the business team: documented rule and defined acceptance criteria." }, tools: ["Discovery", "Gherkin/BDD"] },
  { when: { pt: "Construção", en: "Building" }, what: { pt: "Telas fiéis ao design em React e React Native, com carregamento, erro e vazio tratados.", en: "Design-faithful screens in React and React Native, with loading, error and empty states." }, tools: ["React Native", "React", "TypeScript"] },
  { when: { pt: "Revisão", en: "Review" }, what: { pt: "Code review do time e commits pequenos e contextualizados.", en: "Team code review and small, well-scoped commits." }, tools: ["Git", "Code review"] },
  { when: { pt: "Com IA", en: "With AI" }, what: { pt: "Agentes de IA com regras versionadas para documentação, revisão e pesquisa. As decisões técnicas são minhas e ficam registradas.", en: "AI agents with versioned rules for documentation, review and research. Technical decisions stay with me and are recorded." }, tools: ["Claude", "Gemini", "NotebookLM"] },
  { when: { pt: "Todo mês", en: "Monthly" }, what: { pt: "1:1 com a liderança e plano de desenvolvimento individual.", en: "1:1 with leadership and an individual development plan." }, tools: ["Scrum/Kanban"] },
];

export const TOOLBOX = [
  { group: { pt: "Interface", en: "Interface" }, items: ["React", "React Native", "Next.js", "TypeScript", "HTML/CSS", "Tailwind", "Framer Motion", "Remotion"] },
  { group: { pt: "Integração & dados", en: "Integration & data" }, items: ["REST APIs", "Node.js", "NestJS", "Java/Spring", "SQL", "PostgreSQL", "NoSQL", "Redis"] },
  { group: { pt: "Produção", en: "Production" }, items: ["App Store", "Google Play", "Firebase", "Microsoft Clarity", "CI/CD", "Docker"] },
  { group: { pt: "Método", en: "Method" }, items: ["Discovery", "Gherkin/BDD", "ADR", "Code review", "Scrum/Kanban"] },
];

export const EDUCATION = [
  { title: { pt: "Ciências Econômicas", en: "Economics" }, where: { pt: "Graduação em curso", en: "Undergraduate, in progress" } },
  { title: { pt: "Gestão de processos aplicada", en: "Applied process management" }, where: { pt: "Consultoria Gomes de Matos", en: "Gomes de Matos consultancy" } },
  { title: { pt: "Treinamento de IA (SFT)", en: "AI training (SFT)" }, where: { pt: "Outlier AI · 2024–2025 · +120 tarefas", en: "Outlier AI · 2024–2025 · 120+ tasks" } },
  { title: { pt: "Ensino Médio", en: "High school" }, where: { pt: "Colégio Christus · 2020", en: "Colégio Christus · 2020" } },
  { title: { pt: "Inglês avançado", en: "Advanced English" }, where: { pt: "Diretrizes e documentação em inglês no dia a dia", en: "English guidelines and docs every day" } },
];

export const GOALS = [
  { title: { pt: "Qualidade de interface", en: "Interface quality" }, text: { pt: "Testes automatizados no front-end, acessibilidade (WCAG) e estados de erro e carregamento consistentes.", en: "Front-end automated tests, accessibility (WCAG) and consistent error and loading states." } },
  { title: { pt: "Um time de produto", en: "A product team" }, text: { pt: "Construir apps e interfaces em React e React Native num time com régua alta de qualidade.", en: "Build apps and interfaces in React and React Native on a team with a high bar." } },
  { title: { pt: "Engenharia e negócio", en: "Engineering and business" }, text: { pt: "Concluir Ciências Econômicas e aplicar a leitura de custo e impacto às decisões de produto.", en: "Complete my Economics degree and apply cost-and-impact analysis to product decisions." } },
];

// ---------- O que eu entrego (competências com evidência) ----------
export const DELIVER = [
  {
    icon: "smartphone",
    h: { pt: "Apps e interfaces prontos para produção", en: "Production-ready apps and interfaces" },
    p: { pt: "React Native e React com TypeScript, fiéis ao design, publicados na App Store e no Google Play.", en: "React Native and React with TypeScript, true to design, released on the App Store and Google Play." },
    proof: { pt: "Apps white-label em produção", en: "White-label apps in production" },
    href: "#bastidores",
  },
  {
    icon: "plug",
    h: { pt: "Integrações resilientes", en: "Resilient integrations" },
    p: { pt: "APIs REST, financeiras e de IA, com tratamento de erros e contingência, incluindo migração de API legada.", en: "REST, financial and AI APIs with error handling and fallback, including legacy API migration." },
    proof: { pt: "Migração da API legada", en: "Legacy API migration" },
    href: "#bastidores",
  },
  {
    icon: "activity",
    h: { pt: "Monitoramento em produção", en: "Production monitoring" },
    p: { pt: "Firebase, Microsoft Clarity, SQL e NoSQL para análise de comportamento e diagnóstico de problemas.", en: "Firebase, Microsoft Clarity, SQL and NoSQL for behavior analysis and issue diagnosis." },
    proof: { pt: "Rotina diária de monitoramento", en: "Daily monitoring routine" },
    href: "#dia-a-dia",
  },
  {
    icon: "messages-square",
    h: { pt: "Discovery e especificação", en: "Discovery and specification" },
    p: { pt: "Levantamento com as áreas de negócio, regras documentadas, critérios de aceite, code review e capacitação do time.", en: "Stakeholder discovery, documented rules, acceptance criteria, code review and team training." },
    proof: { pt: "Capacitação e code review do time", en: "Team training and code review" },
    href: "#capitulos",
  },
] as const;
