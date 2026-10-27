# Portfólio — Caio César Ponte

Desenvolvedor Front-End & Mobile · Fortaleza, CE.

Next.js 15 + TypeScript + Tailwind + Framer Motion + **Remotion**. PT-BR e EN.

- Todo o conteúdo fica em `src/content/profile.ts` (perfil, projetos, trajetória, formação, objetivos). O site e os vídeos leem do mesmo arquivo.
- `src/remotion/Showreel.tsx` — showreel exibido no hero com `@remotion/player`.
- `src/remotion/ProjectReel.tsx` — mini-vídeo de cada projeto, aberto pelo botão ▶ Assistir.

```bash
npm ci --legacy-peer-deps
npm run dev            # site
npm run video:studio   # editar os vídeos no Remotion Studio
npm run video          # exportar out/showreel.mp4
```
