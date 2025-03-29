import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Colors } from "@mjt-engine/color";
import type { Point3 } from "@mjt-engine/math";
import { isDefined } from "@mjt-engine/object";

export const drawTextOnTexture = (
  texture: DynamicTexture,
  text: string,

  options: Partial<{
    color: string;
    outline: boolean;
    outlineColor: string;
    backgroundColor: string;
    text: string;
    textureSize: number;
    textScale: number;
    rotation: Point3;
    fontFamily: string;
    fontStyle: string;
  }> = {}
) => {
  const {
    backgroundColor,
    outline = true,
    color = "black",
    fontFamily = "monospace",
    fontStyle = "bold",
    outlineColor = Colors.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize = Math.min(texture.getSize().width, texture.getSize().height),
  } = options;
  texture.hasAlpha = true;
  let fontSize = textureSize;
  let font = `${fontStyle} ${fontSize}px ${fontFamily}`;
  const ctx = texture.getContext();

  ctx.font = font;
  let measure = ctx.measureText(text);
  fontSize = (textureSize / measure.width) * textureSize;
  font = `${fontStyle} ${fontSize}px ${fontFamily}`;
  ctx.font = font;
  const textX = 0;
  measure = ctx.measureText(text);
  /** @ts-ignore */
  const top = measure["fontBoundingBoxAscent"] ?? 0;
  const textY = textureSize - (textureSize - top) / 2;
  ctx.lineWidth = fontSize / 2;

  const bbox = {
    x: 0,
    y: textY - fontSize,
    width: textureSize,
    height: top * 2,
  };
  if (isDefined(backgroundColor)) {
    ctx.fillStyle = Colors.from(backgroundColor).toString();
    const { x, y, width, height } = bbox;
    // ctx.fillRect(0, textY - fontSize, textureSize, top * 2);
    ctx.fillRect(x, y, width, height);
  }
  if (outline) {
    ctx.strokeStyle = outlineColor;
    ctx.strokeText(text, textX, textY);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, textX, textY);

  texture.hasAlpha = true;
  texture.update();
  return bbox;
};
