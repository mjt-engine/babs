import type { Engine } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
import type { TextureLayer } from "./TextureLayer";
import { layerToPlane } from "./layerToPlane";

export const imageLayersToScene = async (
  layers: TextureLayer[],
  engine: Engine
) => {
  const scene = new Scene(engine);
  const planes = await Promise.all(
    layers.map(async (image, index) => {
      const plane = await layerToPlane(image, scene);
      plane.position.set(0, 0, -index);
      return plane;
    })
  );
  return scene;
};
