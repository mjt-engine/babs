import { type Scene, WebXRCamera } from "@babylonjs/core";
import type { BabWebXRSessionManager, WebXrCameraOptions } from "./Cameras";
import { getCamera } from "./getCamera";
import { updateCamera } from "./updateCamera";


export const getWebXrCamera = (
  scene: Scene,
  name: string,
  xrSessionManager: BabWebXRSessionManager,
  options: WebXrCameraOptions = {}
) => {
  const camera = getCamera(scene, name, () => {
    return new WebXRCamera(name, scene, xrSessionManager);
  });
  updateCamera(camera, options);
  return camera;
};
