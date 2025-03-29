import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";

export const drawOnTexture = (
  texture: DynamicTexture,
  render: (
    ctx: ICanvasRenderingContext,
    size: { width: number; height: number }
  ) => void
) => {
  const size = texture.getSize();
  const ctx = texture.getContext();
  render(ctx, size);
  texture.update();
};
