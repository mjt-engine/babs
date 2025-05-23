import type { Scene } from "@babylonjs/core";

export const destroyTexture = (scene: Scene, name: string) => {
  const tex = scene.getTextureByName(name);
  if (!tex) {
    return;
  }
  tex.dispose();
  scene.removeTexture(tex);
};
