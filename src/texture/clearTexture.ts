import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { drawOnTexture } from "./drawOnTexture";

export const clearTexture = (texture: DynamicTexture) => {
  drawOnTexture(texture, (ctx, size) => {
    const { width, height } = size;
    ctx.clearRect(0, 0, width, height);
  });
};
