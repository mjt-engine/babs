import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Colors } from "@mjt-engine/color";
import { drawOnTexture } from "./drawOnTexture";

export const drawBackgroundOnTexture = (
  texture: DynamicTexture,
  options: Partial<{
    color: string;
  }> = {}
) => {
  const { color = "black" } = options;
  drawOnTexture(texture, (ctx, size) => {
    const { width, height } = size;
    ctx.fillStyle = Colors.from(color).toString();
    ctx.fillRect(0, 0, width, height);
  });
};
