import type { BaseTexture } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
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
