import type { Lang } from "../../content/profile";

// Todo texto que aparece dentro dos vídeos, nos dois idiomas.
export const KT = {
  pt: {
    chapter: "Capítulo", backstage: "Bastidores", nextEvent: "Próximo evento", event: "Congresso 2026",
    tiles: ["Agenda", "Notícias", "Carteirinha", "Mapa"], offline: "Sem conexão", offlineSub: "Mostrando a última versão salva.", retry: "Tentar de novo", org: "Entidade",
    orders: "Ordens de serviço", branch: "Filial · Centro",
    rows: [["#1042", "iPhone 13 — tela", "Aguardando aprovação"], ["#1041", "Notebook — teclado", "Em reparo"], ["#1040", "Galaxy S22 — bateria", "Pronto"], ["#1039", "PS5 — HDMI", "Em reparo"]],
    kpis: ["Hoje", "Clientes", "Mês (R$)"], locale: "pt-BR",
  },
  en: {
    chapter: "Chapter", backstage: "Backstage", nextEvent: "Next event", event: "Congress 2026",
    tiles: ["Schedule", "News", "Member ID", "Map"], offline: "No connection", offlineSub: "Showing the last saved version.", retry: "Try again", org: "Organization",
    orders: "Service orders", branch: "Branch · Downtown",
    rows: [["#1042", "iPhone 13 — screen", "Awaiting approval"], ["#1041", "Laptop — keyboard", "In repair"], ["#1040", "Galaxy S22 — battery", "Ready"], ["#1039", "PS5 — HDMI", "In repair"]],
    kpis: ["Today", "Clients", "Month (R$)"], locale: "en-US",
  },
} satisfies Record<Lang, unknown>;
