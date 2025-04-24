import type { Camera } from "@babylonjs/core";
import { Matrix } from "@babylonjs/core";
import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";

export const pickMesh = (
  scene: Scene,
  x: number,
  y: number,
  options: Partial<{
    camera: Camera;
    predicate: (mesh: AbstractMesh) => boolean;
  }> = {}
) => {
  const {
    predicate = (mesh: AbstractMesh) => mesh.isPickable,
    camera = scene.activeCamera,
  } = options;
  const ray = scene.createPickingRay(x, y, Matrix.Identity(), camera);
  const hit = scene.pickWithRay(ray, predicate);
  return hit?.pickedMesh;
};
