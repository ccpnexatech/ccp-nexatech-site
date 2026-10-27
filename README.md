# Portfólio — Caio César Ponte

Desenvolvedor Front-End & Mobile · Fortaleza, CE. Next.js 15, TypeScript, Tailwind, Framer Motion e **Remotion**. PT-BR e EN.

- Conteúdo único em `src/content/profile.ts` — o site e os vídeos leem do mesmo arquivo.
- Barra de acessibilidade (padrão gov.br) em `src/components/a11y`: atalhos Alt+1/2/3, alto contraste, tamanho de fonte, reduzir movimento, tema escuro, sublinhar links, espaçar texto.
- Vídeos em `src/remotion`: `Documentary` (trajetória) e `Backstage` (estudo de caso por projeto), exibidos com `@remotion/player`.
- Métricas públicas: `/api/metrics` (GitHub, cache de 1 h; defina `GITHUB_TOKEN` opcional) e Web Vitals medidos no navegador.

```bash
npm ci --legacy-peer-deps
npm run dev            # site
npm run video:studio   # editar os vídeos
npm run video          # exportar out/documentario.mp4
```
