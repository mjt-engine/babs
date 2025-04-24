import { HtmlElementTexture } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import type { HtmlElementTextureOptions } from "./Textures";
import { getTexture } from "./getTexture";
import { samplingModeNumber } from "./samplingModeNumber";
import { updateTexture } from "./updateTexture";

export const getHtmlElementTexture = (
  scene: Scene,
  name: string,
  options: HtmlElementTextureOptions
) => {
  return getTexture(scene, name, () => {
    const {
      element,
      generateMipMaps = true,
      samplingMode = "linearNearest",
    } = options;
    if (!element) {
      throw new Error("HTML element is required to create texture", {
        cause: options,
      });
    }
    const texture = new HtmlElementTexture(name, element, {
      generateMipMaps,
      samplingMode: samplingModeNumber(samplingMode),
      engine: scene.getEngine(),
      scene,
    });
    updateTexture(texture, options);
    return texture;
  });
};
