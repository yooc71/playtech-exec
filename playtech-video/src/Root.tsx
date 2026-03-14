import { Composition } from "remotion";
import { PlaytechIntro } from "./PlaytechIntro";

export const RemotionRoot = () => {
  return (
    <Composition
      id="PlaytechIntro"
      component={PlaytechIntro}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
