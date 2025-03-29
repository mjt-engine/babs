import type { Scene } from "@babylonjs/core/scene";
import { fixEyelashes } from "./fixEyelashes";
import { fixEyes } from "./fixEyes";
import { fixBumpMaps } from "./fixBumpMaps";

export const fixDazFigure = (scene: Scene) => {
  fixEyelashes(scene);
  scene.meshes.map(fixEyes);
  fixBumpMaps(scene);
};
