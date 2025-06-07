import { type Scene, FreeCamera } from "@babylonjs/core";
import { Babs } from "../bab/Babs";
import type { FreeCameraOptions } from "./Cameras";
import { getCamera } from "./getCamera";
import { updateCamera } from "./updateCamera";


export const getFreeCamera = (
  scene: Scene,
  name: string,
  options: FreeCameraOptions = {}
) => {
  const camera = getCamera(scene, name, () => {
    const { position = [0, 0, 0] } = options;
    return new FreeCamera(name, Babs.v3(position), scene);
  });
  updateCamera(camera, options);
  return camera;
};
