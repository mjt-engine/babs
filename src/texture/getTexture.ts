import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export const getTexture = <T extends BaseTexture>(
  scene: Scene,
  name: string,
  producer: () => T
) => {
  const texture = scene.getTextureByName(name);
  if (isDefined(texture)) {
    return texture as T;
  }
  return producer();
};
