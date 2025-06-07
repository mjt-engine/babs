import * as BABYLON from "@babylonjs/core";
import { Scene as BabScene } from "@babylonjs/core";
import { BabWebXRSessionManager } from "../camera/Cameras";


export const createWebXrSessionManager = (
  scene: BabScene
): BabWebXRSessionManager => {
  return new BABYLON.WebXRSessionManager(scene);
};
