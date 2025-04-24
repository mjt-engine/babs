import { StandardMaterial } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";
import { Randoms } from "@mjt-engine/random";
import { c3 } from "../bab/c3";
import type { TextureImageSrc } from "./TextureImageSrc";
import type { TextureLayer } from "./TextureLayer";
import { imageToTexture } from "./imageToTexture";

export const hasValidId = (obj: { id: string | number } | string) => {
  if (typeof obj === "string") {
    return true;
  }
  return isDefined(obj.id) && String(obj.id).startsWith("id-");
};

export const idOfImageSrc = (src: TextureImageSrc) => {
  if (typeof src === "string") {
    return src;
  }
  if ("id" in src) {
    return src.id;
  }
  return undefined;
};

export const layerToPlane = async (layer: TextureLayer, scene: Scene) => {
  const id = Randoms.randomUuid();
  const { size, image, color } = layer;
  const plane = MeshBuilder.CreatePlane(
    `plane-${id}`,
    {
      width: size,
      height: size,
    },
    scene
  );
  const material = new StandardMaterial(`material-${id}`, scene);
  if (isDefined(image)) {
    const texture = await imageToTexture(scene, `layer-${id}`, image);
    layer._texture = texture;
    layer._mesh = plane;
    layer._material = material;

    texture.hasAlpha = true;
    material.opacityTexture = texture;
    material.emissiveTexture = texture;
  }

  if (isDefined(color)) {
    material.emissiveColor = c3(color);
  }

  plane.material = material;
  return plane;
};
