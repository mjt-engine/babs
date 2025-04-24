import type { BaseTexture } from "@babylonjs/core";
import { DynamicTexture } from "@babylonjs/core";
import { iff } from "@mjt-engine/object";
import type { AllTextureOptions } from "./Textures";

export const updateTexture = (
  texture: BaseTexture,
  options: AllTextureOptions
) => {
  const { hasAlpha } = options;
  iff(hasAlpha, (value) => {
    texture.hasAlpha = value;
  });

  if (texture instanceof DynamicTexture) {
    texture.update();
  }
};
