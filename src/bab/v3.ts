import { Vector3 } from "@babylonjs/core";
import type { Point2, Point3 } from "@mjt-engine/math";
import { toVec3 } from "@mjt-engine/math";

export function v3(
  xOrPosition: number | Point3 | Point2 = 0,
  y: number = 0,
  z: number = 0
) {
  if (typeof xOrPosition === "number") {
    return new Vector3(xOrPosition, y, z);
  }

  const [xx = 0, yy = 0, zz = 0] = toVec3(xOrPosition as Point3);
  return new Vector3(xx, yy, zz);
}
