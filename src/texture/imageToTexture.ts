import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Scene } from "@babylonjs/core/scene";
import { imageSrcToUrl } from "../util/imageSrcToUrl";

export const imageToTexture = async (
  scene: Scene,
  name: string,
  image: string | HTMLImageElement | HTMLCanvasElement | OffscreenCanvas
): Promise<Texture> => {
  if (image instanceof HTMLCanvasElement) {
    return new Promise((resolve, reject) => {
      try {
        const texture = new DynamicTexture(name, image, scene);
        texture.update();
        texture.hasAlpha = true;
        resolve(texture);
      } catch (reason) {
        reject(reason);
      }
    });
  }

  const url = await imageSrcToUrl(image);
  return new Promise((resolve, reject) => {
    try {
      const texture = new Texture(url, scene, false, true);
      texture.hasAlpha = true;
      texture.onLoadObservable.addOnce(() => {
        resolve(texture);
      });
    } catch (reason) {
      reject(reason);
    }
  });
};
