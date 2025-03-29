import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import type { TEXTURE_SAMPLING_MODES } from "./TEXTURE_SAMPLING_MODES";
import { builder } from "./builder";
import { clearTexture } from "./clearTexture";
import { copyToCanvas } from "./copyToCanvas";
import { debugImage } from "./debugImage";
import { destroyTexture } from "./destroyTexture";
import { drawBackgroundOnTexture } from "./drawBackgroundOnTexture";
import { drawOnTexture } from "./drawOnTexture";
import { drawTextOnTexture } from "./drawTextOnTexture";
import { getDynamicTexture } from "./getDynamicTexture";
import { getHtmlElementTexture } from "./getHtmlElementTexture";
import { getPathTexture } from "./getPathTexture";
import { getTexture } from "./getTexture";
import { imageToTexture } from "./imageToTexture";
import { updateTexture } from "./updateTexture";

export type TextureSamplingModeMap = typeof TEXTURE_SAMPLING_MODES;

export type TextureOptions = Partial<{
  hasAlpha: boolean;
  generateMipMaps: boolean;
  samplingMode: keyof TextureSamplingModeMap;
}>;

export type HtmlElementTextureOptions = Partial<
  TextureOptions & {
    element: HTMLCanvasElement | HTMLVideoElement;
  }
>;

export type PathTextureOptions = Partial<
  TextureOptions & {
    src: string;
  }
>;

export type DynamicTextureOptions = Partial<
  TextureOptions & {
    width: number;
    height: number;
    init: (ctx: ICanvasRenderingContext) => void;
  }
>;

export type AllTextureOptions = HtmlElementTextureOptions &
  DynamicTextureOptions;

export const Textures = {
  builder,
  copyToCanvas,
  debugImage,
  getTexture,
  getHtmlElementTexture,
  getDynamicTexture,
  getPathTexture,
  updateTexture,

  imageToTexture,

  drawTextOnTexture,
  drawOnTexture,
  drawBackgroundOnTexture,
  clearTexture,
  destroyTexture,
};
