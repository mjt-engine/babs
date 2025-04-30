import type { Scene } from "@babylonjs/core";
import { v3 } from "../bab/v3";
import { UniversalCamera } from "@babylonjs/core";
import { Camera } from "@babylonjs/core";
import { BabUniversalCamera } from "../type/BabCamera";

export const createTopDownCamera = (
  scene: Scene,
  name: string,
  {
    unitsTall = 1,
    unitsWide = 1,
    cameraLevel = -100,

    disposeActive = false,
  }: Partial<{
    cameraLevel: number;
    disposeActive: boolean;
    unitsTall: number;
    unitsWide: number;
  }> = {}
): BabUniversalCamera => {
  if (disposeActive) {
    scene?.activeCamera?.dispose();
  }
  const camera = new UniversalCamera(name, v3(0, 0, cameraLevel), scene);
  camera.target = v3(0, 0, 0);
  camera.rotation = v3(0, 0, Math.PI); // Y up
  camera.orthoTop = -unitsTall / 2;
  camera.orthoBottom = unitsTall / 2;
  camera.orthoLeft = unitsWide / 2;
  camera.orthoRight = -unitsWide / 2;
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  return camera;
};
