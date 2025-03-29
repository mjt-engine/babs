import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import type { Point3 } from "@mjt-engine/math";
import { v3 } from "../bab/v3";

export const updateArcRotateCameraPosition = (
  camera: ArcRotateCamera,
  position: Point3
) => {
  const currentAlpha = camera.alpha;
  const currentBeta = camera.beta;
  const currentRadius = camera.radius;
  camera.target = camera.target.add(v3(position));
  camera.radius = currentRadius;
  camera.alpha = currentAlpha;
  camera.beta = currentBeta;
};
