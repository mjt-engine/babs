import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { Scene } from "@babylonjs/core/scene";
import { TEXTURE_SAMPLING_MODES } from "./TEXTURE_SAMPLING_MODES";
import type { DynamicTextureOptions } from "./Textures";
import { getTexture } from "./getTexture";
import { updateTexture } from "./updateTexture";

export const getDynamicTexture = (
  scene: Scene,
  name: string,
  options: DynamicTextureOptions = {}
) => {
  const texture = getTexture(scene, name, () => {
    const {
      generateMipMaps = true,
      samplingMode = "linearNearest",
      width = 1024,
      height = 1024,
      init,
    } = options;
    const result = new DynamicTexture(
      name,
      {
        width,
        height,
      },
      scene,
      generateMipMaps,
      TEXTURE_SAMPLING_MODES[samplingMode]
    );
    if (init) {
      init(result.getContext());
      result.update();
    }
    return result;
  });
  updateTexture(texture, options);
  return texture;
};
