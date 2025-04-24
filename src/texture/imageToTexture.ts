import { DynamicTexture } from "@babylonjs/core";
import { Texture } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
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
      texture.name = name;
      texture.hasAlpha = true;
      texture.onLoadObservable.addOnce(() => {
        resolve(texture);
      });
    } catch (reason) {
      reject(reason);
    }
  });
};
