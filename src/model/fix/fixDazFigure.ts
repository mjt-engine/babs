import type { Scene } from "@babylonjs/core";
import { fixEyelashes } from "./fixEyelashes";
import { fixEyes } from "./fixEyes";
import { fixBumpMaps } from "./fixBumpMaps";

export const fixDazFigure = (scene: Scene) => {
  fixEyelashes(scene);
  scene.meshes.map(fixEyes);
  fixBumpMaps(scene);
};
