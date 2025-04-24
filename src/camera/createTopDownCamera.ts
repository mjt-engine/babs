import type { Scene } from "@babylonjs/core";
import { v3 } from "../bab/v3";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Camera } from "@babylonjs/core/Cameras/camera";

export const createTopDownCamera = (
  scene: Scene,
  name: string,
  {
    unitsTall = 1,
    unitsWide = 1,
    height = 100,

    disposeActive = false,
  }: Partial<{
    height: number;
    disposeActive: boolean;
    unitsTall: number;
    unitsWide: number;
  }> = {}
) => {
  if (disposeActive) {
    scene?.activeCamera?.dispose();
  }
  const camera = new UniversalCamera(name, v3(0, 0, height), scene);
  camera.target = v3(0, 0, 0);
  camera.rotation = v3(0, Math.PI, Math.PI);
  camera.orthoTop = -unitsTall / 2;
  camera.orthoBottom = unitsTall / 2;
  camera.orthoLeft = -unitsWide / 2;
  camera.orthoRight = unitsWide / 2;
  // camera.detachControl();
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  return camera;
};
