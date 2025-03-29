import { Ray } from "@babylonjs/core/Culling/ray";
import type { Point3 } from "@mjt-engine/math";
import { v3 } from "../bab/v3";

export const createRay = (
  origin: Point3,
  direction: Point3,
  length?: number
) => {
  return new Ray(v3(origin), v3(direction), length);
};
