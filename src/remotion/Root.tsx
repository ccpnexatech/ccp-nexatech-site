// Entrada para renderizar os vídeos em MP4: npm run video
import React from "react";
import { Composition, registerRoot, staticFile } from "remotion";
import { Showreel, SHOWREEL } from "./Showreel";
import { ProjectReel, PROJECT_REEL } from "./ProjectReel";

const Root: React.FC = () => (
  <>
    <Composition id="Showreel" component={Showreel} {...SHOWREEL} defaultProps={{ lang: "pt" as const, photoSrc: staticFile("caio.jpg") }} />
    <Composition id="ProjectReel" component={ProjectReel} {...PROJECT_REEL} defaultProps={{ slug: "ofix", lang: "pt" as const }} />
  </>
);
registerRoot(Root);
