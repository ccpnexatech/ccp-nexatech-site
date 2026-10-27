// Entrada para renderizar os vídeos em MP4: npm run video
import React from "react";
import { Composition, registerRoot, staticFile } from "remotion";
import { Documentary, DOCUMENTARY } from "./Documentary";
import { Backstage, BACKSTAGE_REEL } from "./Backstage";
import { BACKSTAGE } from "../content/profile";

const Root: React.FC = () => (
  <>
    <Composition id="Documentario" component={Documentary} {...DOCUMENTARY} defaultProps={{ lang: "pt" as const, photoSrc: staticFile("caio.jpg") }} />
    {BACKSTAGE.map((b) => (
      <Composition key={b.slug} id={`Bastidores-${b.slug}`} component={Backstage} {...BACKSTAGE_REEL} defaultProps={{ slug: b.slug, lang: "pt" as const }} />
    ))}
  </>
);
registerRoot(Root);
