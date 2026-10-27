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
  linkedin: "https://www.linkedin.com/in/caio-cesar-ponte/",
  github: "https://github.com/ccpnexatech",
  photo: "/caio.jpg",
  availability: {
    pt: "Aberto a vagas de Front-End, Mobile ou React Native — com foco em times internacionais, trabalhando de Fortaleza.",
    en: "Open to Front-End, Mobile or React Native roles — focused on international teams, working from Fortaleza, Brazil.",
  },
  global: {
    pt: "Base em Fortaleza, Ceará, Brasil · remoto para times internacionais · inglês avançado · UTC−3",
    en: "Based in Fortaleza, Ceará, Brazil · remote for international teams · advanced English · UTC−3",
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

// ---------- Estudos de caso ----------
// code.real = true: trecho copiado do repositório público (link no site).
// code.real = false: trecho ilustrativo do padrão — o código da empresa é privado.
export type Backstage = {
  slug: string;
  name: string;
  kind: L;
  device: "phone" | "browser";
  color: string;
  url?: string;
  demo?: string;
  ask: L;
  rules: L[];
  decision: L;
  code: { file: string; lang: string; src: string; note: L; real: boolean; focus: number };
  callouts: L[];
  outcome: L;
  stack: string[];
};

export const BACKSTAGE: Backstage[] = [
  {
    slug: "apps",
    name: "Apps white-label",
    kind: { pt: "Itarget Tecnologia · código privado", en: "Itarget Tecnologia · private code" },
    device: "phone",
    color: "#A8410A",
    ask: {
      pt: "Cada entidade ou evento cliente recebe o próprio app nas lojas, e o app precisa continuar funcionando enquanto a API por trás dele é substituída.",
      en: "Each client organization or event gets its own app in the stores, and the app must keep working while the API behind it is replaced.",
    },
    rules: [
      { pt: "Um código base, muitos apps: marca, cores e módulos mudam por cliente.", en: "One codebase, many apps: brand, colors and modules change per client." },
      { pt: "A ativação de um app depende de uma ficha completa: dados e imagens no formato exigido pelas lojas.", en: "Activating an app depends on a complete form: data and images in the format the stores require." },
      { pt: "Durante a migração, API legada e API nova convivem sem interromper quem já usa.", en: "During migration, legacy and new APIs coexist without interrupting current users." },
    ],
    decision: {
      pt: "Mapear todos os endpoints em uso antes de trocar qualquer um e encapsular as chamadas com contingência para a API legada, registrando cada fallback no Firebase.",
      en: "Map every endpoint in use before replacing any, and wrap calls with a fallback to the legacy API, logging each fallback to Firebase.",
    },
    code: {
      file: "api/request.ts",
      lang: "ts",
      real: false,
      focus: 7,
      note: { pt: "Trecho ilustrativo do padrão aplicado. O código da empresa é privado.", en: "Illustrative excerpt of the pattern used. The company's code is private." },
      src: `type Source = "new" | "legacy";

export async function request<T>(path: string, init?: RequestInit): Promise<{ data: T; source: Source }> {
  try {
    const res = await fetch(\`\${API_NEW}\${path}\`, init);
    if (!res.ok) throw new HttpError(res.status);
    return { data: await res.json(), source: "new" };
  } catch (error) {
    if (!isMigratedEndpoint(path)) throw error;
    track("api_fallback", { path, reason: String(error) });
    const res = await fetch(\`\${API_LEGACY}\${path}\`, init);
    return { data: await res.json(), source: "legacy" };
  }
}`,
    },
    callouts: [
      { pt: "Marca e módulos vêm da configuração do cliente", en: "Brand and modules come from client config" },
      { pt: "Carregamento e erro tratados em toda tela", en: "Loading and error handled on every screen" },
      { pt: "Eventos no Firebase, sessões no Clarity", en: "Events in Firebase, sessions in Clarity" },
    ],
    outcome: { pt: "Apps publicados na App Store e no Google Play; migração concluída sem interrupção para os usuários.", en: "Apps live on the App Store and Google Play; migration completed without interrupting users." },
    stack: ["React Native", "TypeScript", "REST", "Firebase", "Clarity"],
  },
  {
    slug: "ofix",
    name: "OFIX",
    kind: { pt: "Projeto independente · 143 commits · demo pública", en: "Independent project · 143 commits · public demo" },
    device: "browser",
    color: "#1D4ED8",
    url: "https://github.com/ccpnexatech/ofix",
    demo: "https://ofix-web.vercel.app",
    ask: {
      pt: "Assistências técnicas controlam ordens de serviço em papel e WhatsApp. O cliente não acompanha o status e o orçamento se perde.",
      en: "Repair shops track service orders on paper and WhatsApp. Customers can't follow the status and quotes get lost.",
    },
    rules: [
      { pt: "Cada assistência (tenant) tem filiais; nenhum dado pode cruzar de uma assistência para outra.", en: "Each shop (tenant) has branches; no data may cross from one shop to another." },
      { pt: "O cliente aprova o orçamento por link, sem criar conta; o link expira em 7 dias.", en: "Customers approve quotes via link, without an account; the link expires in 7 days." },
      { pt: "Garantia de 90 dias contada a partir da entrega.", en: "90-day warranty counted from delivery." },
    ],
    decision: {
      pt: "O tenant vem do usuário autenticado e fica no contexto da requisição (AsyncLocalStorage). Uma extensão do Prisma aplica o escopo em toda consulta; sem tenant, a consulta falha com TenantIsolationError.",
      en: "The tenant comes from the authenticated user and lives in the request context (AsyncLocalStorage). A Prisma extension scopes every query; without a tenant, the query fails with TenantIsolationError.",
    },
    code: {
      file: "apps/api/src/common/interceptors/tenant-context.interceptor.ts",
      lang: "ts",
      real: true,
      focus: 9,
      note: { pt: "Trecho real do repositório público.", en: "Real excerpt from the public repository." },
      src: `@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const user = context.switchToHttp().getRequest<AuthenticatedRequest>().user;
    if (!user) {
      return next.handle();
    }
    return new Observable((subscriber) => {
      runWithTenant(user.tenantId, () => {
        next.handle().subscribe(subscriber);
      });
    });
  }
}`,
    },
    callouts: [
      { pt: "Filial ativa no topo: o escopo fica visível", en: "Active branch on top: scope stays visible" },
      { pt: "Aprovação do orçamento sem login", en: "Login-free quote approval" },
      { pt: "Tour guiado no primeiro acesso", en: "Guided tour on first access" },
    ],
    outcome: { pt: "Aplicação publicada com demo pública, CI com typecheck, lint e testes antes de cada merge, e decisões registradas em ADR.", en: "Live app with public demo, CI running typecheck, lint and tests before every merge, and decisions recorded as ADRs." },
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "fidc",
    name: "FIDC · Onboarding de cedentes",
    kind: { pt: "Projeto independente · 61 commits · em andamento", en: "Independent project · 61 commits · in progress" },
    device: "browser",
    color: "#0F766E",
    url: "https://github.com/ccpnexatech/fidc-onboarding-cedente",
    ask: {
      pt: "Fundos de recebíveis conferem títulos à mão, a partir de planilhas enviadas por e-mail. O título recusado volta sem padrão e a conciliação com o custodiante acontece dias depois.",
      en: "Receivables funds check titles by hand from spreadsheets sent by email. Rejected titles come back unstructured, and reconciliation with the custodian happens days later.",
    },
    rules: [
      { pt: "Rejeição parcial: um título com problema não derruba o lote; os demais são comprados.", en: "Partial rejection: one bad title doesn't sink the batch; the rest are bought." },
      { pt: "A norma (CVM 175) é o piso; o regulamento do fundo só pode restringir mais.", en: "The regulation (CVM 175) is the floor; the fund's own rules can only be stricter." },
      { pt: "Reenviar o mesmo lote não pode gerar compra em duplicidade.", en: "Resending the same batch must never result in a duplicate purchase." },
    ],
    decision: {
      pt: "Idempotência por chave e impressão digital do conteúdo: o reenvio idêntico devolve a resposta original; a mesma chave com conteúdo diferente é recusada.",
      en: "Idempotency by key and content fingerprint: an identical resend returns the original response; the same key with different content is rejected.",
    },
    code: {
      file: "api/src/batch/domain/use-case/create-batch.use-case.ts",
      lang: "ts",
      real: true,
      focus: 4,
      note: { pt: "Trecho real do repositório público.", en: "Real excerpt from the public repository." },
      src: `async execute(input: CreateBatchInput): Promise<CreateBatchOutput> {
  const fingerprint = this.requestFingerprint.of(input.payload);
  const previous = await this.idempotencyRepository.findByKey(input.idempotencyKey);
  if (previous !== null) {
    if (previous.fingerprint !== fingerprint) {
      throw new IdempotencyKeyConflictException(input.idempotencyKey);
    }
    const original = await this.batchRepository.findById(previous.batchId);
    if (original !== null) {
      return { batch: original, replayed: true };
    }
  }
  // ...avalia elegibilidade título a título e grava o lote
}`,
    },
    callouts: [
      { pt: "10 regras de aceite ligadas à norma", en: "10 acceptance rules tied to regulation" },
      { pt: "Contrato OpenAPI da remessa", en: "OpenAPI contract for submissions" },
      { pt: "29 testes de homologação no CI", en: "29 acceptance tests in CI" },
    ],
    outcome: { pt: "Discovery com 9 pontos de falha mapeados, 11 histórias com critérios de aceite, API em NestJS, conciliação em SQL e 29 testes automatizados no CI.", en: "Discovery with 9 failure points mapped, 11 user stories with acceptance criteria, a NestJS API, SQL reconciliation and 29 automated tests in CI." },
    stack: ["NestJS", "TypeScript", "OpenAPI", "PostgreSQL", "Newman"],
  },
];

// ---------- Projetos na empresa (sem código público) ----------
export type CompanyWork = { name: L; role: string; desc: L; stack: string; share: number };
// share: participação aproximada da atividade no iGit (jul/2025 — out/2026), em %.
export const COMPANY_WORK: CompanyWork[] = [
  { name: { pt: "App mobile white-label", en: "White-label mobile app" }, role: "Developer", share: 54, stack: "React Native · TypeScript · Firebase", desc: { pt: "Principal frente de trabalho: telas, integrações, migração de API e publicação nas lojas.", en: "Main workstream: screens, integrations, API migration and store releases." } },
  { name: { pt: "Plataforma v5 e painel administrativo", en: "Platform v5 and admin panel" }, role: "Developer", share: 27, stack: "Monorepo · TypeScript", desc: { pt: "Nova versão do aplicativo e do admin, estruturada em monorepo para receber novos projetos.", en: "New version of the app and admin, structured as a monorepo to host new projects." } },
  { name: { pt: "Front-end React dos sistemas", en: "React front-end for internal systems" }, role: "Maintainer", share: 10, stack: "React · TypeScript", desc: { pt: "Mantenedor do repositório: revisão e integração de merge requests.", en: "Repository maintainer: reviewing and merging merge requests." } },
  { name: { pt: "Backoffice web", en: "Web back office" }, role: "Developer", share: 7, stack: "React · Jest · ESLint", desc: { pt: "Atualização de ferramentas, regras de lint e tipagem, testes unitários e correção de hidratação de tema.", en: "Tooling upgrades, lint and type rules, unit tests and a theme-hydration fix." } },
  { name: { pt: "Controle de acesso", en: "Access control" }, role: "Developer", share: 1, stack: "TypeScript", desc: { pt: "Serviço de permissões compartilhado entre os sistemas.", en: "Permission service shared across systems." } },
  { name: { pt: "Painel de versões dos apps", en: "App versions panel" }, role: "Developer", share: 0, stack: "TypeScript", desc: { pt: "Acompanhamento das versões publicadas de cada app.", en: "Tracking published versions of each app." } },
];

// ---------- Projetos independentes ----------
export type Project = { name: string; desc: L; stack: string; url?: string; status: L };
export const ALL_PROJECTS: Project[] = [
  { name: "OFIX", desc: { pt: "SaaS multi-tenant de ordens de serviço, com demo pública", en: "Multi-tenant service-order SaaS with public demo" }, stack: "Next.js · NestJS · Prisma · PostgreSQL", url: "https://github.com/ccpnexatech/ofix", status: { pt: "Publicado · 143 commits", en: "Live · 143 commits" } },
  { name: "FIDC · Onboarding de cedentes", desc: { pt: "Do discovery à API homologada, com regras ligadas à CVM 175", en: "From discovery to an approved API, with rules tied to CVM 175" }, stack: "NestJS · OpenAPI · SQL · Newman", url: "https://github.com/ccpnexatech/fidc-onboarding-cedente", status: { pt: "Em andamento · 61 commits", en: "In progress · 61 commits" } },
  { name: "TransparênciaBR", desc: { pt: "API de inteligência empresarial com dados públicos", en: "Business-intelligence API on public data" }, stack: "Java 21 · Spring Boot · Redis", status: { pt: "Beta privado", en: "Private beta" } },
  { name: "Guia de Ativação", desc: { pt: "Ficha PDF → YAML → guia passo a passo para ativação de apps", en: "PDF form → YAML → step-by-step app activation guide" }, stack: "Python · YAML · LaTeX", status: { pt: "Uso interno", en: "Internal use" } },
  { name: "Este portfólio", desc: { pt: "Next.js + Remotion, com testes de acessibilidade no CI", en: "Next.js + Remotion, with accessibility tests in CI" }, stack: "Next.js · Remotion · Playwright", url: "https://github.com/ccpnexatech/ccp-nexatech-site", status: { pt: "Publicado", en: "Live" } },
  { name: "LeadFlow", desc: { pt: "Ferramenta open source de prospecção no LinkedIn", en: "Open-source LinkedIn prospecting tool" }, stack: "JavaScript · Brave Search API", url: "https://github.com/ccpnexatech/leadflow", status: { pt: "Open source", en: "Open source" } },
];

// ---------- Rotina de trabalho (reflete o fluxo real no iGit) ----------
export const DAILY = [
  { when: { pt: "Triagem", en: "Triage" }, what: { pt: "Erros e sessões com fricção no Firebase e no Clarity; prioridades do dia no quadro de tarefas.", en: "Errors and friction sessions in Firebase and Clarity; day priorities on the task board." }, tools: ["Firebase", "Microsoft Clarity"] },
  { when: { pt: "Discovery", en: "Discovery" }, what: { pt: "Alinhamento com a área de negócio: regra documentada e critérios de aceite antes de abrir o editor.", en: "Alignment with the business team: documented rule and acceptance criteria before opening the editor." }, tools: ["Discovery", "Gherkin/BDD"] },
  { when: { pt: "Branch por tarefa", en: "Branch per task" }, what: { pt: "Uma branch por tarefa, nomeada pelo número dela (fix/, chore/, feat/), com commits pequenos e convencionais.", en: "One branch per task, named after its number (fix/, chore/, feat/), with small conventional commits." }, tools: ["Git", "Conventional Commits"] },
  { when: { pt: "Construção", en: "Building" }, what: { pt: "Telas fiéis ao design em React e React Native, com estados de carregamento, erro e vazio.", en: "Design-faithful screens in React and React Native, with loading, error and empty states." }, tools: ["React Native", "React", "TypeScript"] },
  { when: { pt: "Portões de qualidade", en: "Quality gates" }, what: { pt: "Lint, tipagem e testes unitários passam antes de qualquer merge request.", en: "Lint, type checks and unit tests pass before any merge request." }, tools: ["ESLint", "Jest", "CI/CD"] },
  { when: { pt: "Revisão e release", en: "Review and release" }, what: { pt: "Merge request em rascunho, revisão do time e uma branch de release que agrupa as entregas.", en: "Draft merge request, team review and a release branch that groups the deliveries." }, tools: ["Code review", "GitLab"] },
  { when: { pt: "Publicação", en: "Release" }, what: { pt: "Build e envio para App Store e Google Play; acompanhamento pós-release no Firebase.", en: "Build and submission to the App Store and Google Play; post-release monitoring in Firebase." }, tools: ["App Store", "Google Play", "Firebase"] },
  { when: { pt: "Com IA", en: "With AI" }, what: { pt: "Agentes de IA com regras versionadas para documentação, revisão e pesquisa. As decisões técnicas ficam comigo e são registradas.", en: "AI agents with versioned rules for documentation, review and research. Technical decisions stay with me and are recorded." }, tools: ["Claude", "Gemini", "NotebookLM"] },
];

export const TOOLBOX = [
  { group: { pt: "Interface", en: "Interface" }, items: ["React", "React Native", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Remotion"] },
  { group: { pt: "Qualidade", en: "Quality" }, items: ["ESLint", "Jest", "Playwright", "CI/CD", "Code review", "Conventional Commits"] },
  { group: { pt: "Produção", en: "Production" }, items: ["App Store", "Google Play", "Firebase", "Microsoft Clarity", "GitLab", "Git"] },
  { group: { pt: "Integração & dados", en: "Integration & data" }, items: ["REST", "NestJS", "Prisma", "PostgreSQL", "SQL", "NoSQL"] },
  { group: { pt: "Método & IA", en: "Method & AI" }, items: ["Discovery", "Gherkin/BDD", "ADR", "Claude", "Gemini", "NotebookLM"] },
];

export const EDUCATION = [
  { title: { pt: "Formação superior", en: "Higher education" }, where: { pt: "Início planejado para 2027", en: "Planned to start in 2027" } },
  { title: { pt: "Gestão de processos aplicada", en: "Applied process management" }, where: { pt: "Consultoria Gomes de Matos", en: "Gomes de Matos consultancy" } },
  { title: { pt: "Treinamento de modelos de IA (SFT)", en: "AI model training (SFT)" }, where: { pt: "Outlier AI · 2024–2025 · +120 tarefas", en: "Outlier AI · 2024–2025 · 120+ tasks" } },
  { title: { pt: "Inglês avançado", en: "Advanced English" }, where: { pt: "Diretrizes e documentação em inglês no dia a dia", en: "English guidelines and documentation every day" } },
  { title: { pt: "Ensino Médio", en: "High school" }, where: { pt: "Colégio Christus · 2020", en: "Colégio Christus · 2020" } },
];

export const GOALS = [
  { title: { pt: "Times internacionais", en: "International teams" }, text: { pt: "Atuar com times e produtos internacionais, trabalhando de Fortaleza, em inglês e com sobreposição de fuso com as Américas e a Europa.", en: "Work with international teams and products from Fortaleza, in English, with time-zone overlap with the Americas and Europe." } },
  { title: { pt: "Qualidade de interface", en: "Interface quality" }, text: { pt: "Testes automatizados no front-end, acessibilidade (WCAG) e estados de erro e carregamento consistentes.", en: "Front-end automated tests, accessibility (WCAG) and consistent error and loading states." } },
  { title: { pt: "Formação superior", en: "Higher education" }, text: { pt: "Iniciar a graduação em 2027, somando a formação acadêmica à experiência prática.", en: "Start a degree in 2027, adding academic training to hands-on experience." } },
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
    icon: "git-pull-request",
    h: { pt: "Entrega constante e revisada", en: "Constant, reviewed delivery" },
    p: { pt: "Mais de mil contribuições no último ano no GitLab da empresa: branches por tarefa, merge requests e revisão de código.", en: "Over a thousand contributions last year on the company GitLab: per-task branches, merge requests and code review." },
    proof: { pt: "Ver métricas públicas", en: "See public metrics" },
    href: "#metricas",
  },
  {
    icon: "messages-square",
    h: { pt: "Discovery e especificação", en: "Discovery and specification" },
    p: { pt: "Levantamento com as áreas de negócio, regras documentadas, critérios de aceite e capacitação do time.", en: "Stakeholder discovery, documented rules, acceptance criteria and team training." },
    proof: { pt: "Estudo de caso FIDC", en: "FIDC case study" },
    href: "#bastidores",
  },
] as const;
