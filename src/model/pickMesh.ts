import type { Camera } from "@babylonjs/core/Cameras/camera";
import { Matrix } from "@babylonjs/core/Maths/math.vector";
import type { Scene } from "@babylonjs/core/scene";
import type { ModelMesh } from "./ModelBuilder";

export const pickMesh = (
  scene: Scene,
  x: number,
  y: number,
  options: Partial<{
    camera: Camera;
    predicate: (mesh: ModelMesh) => boolean;
  }> = {}
) => {
  const { camera = scene.activeCamera, predicate = () => true } = options;
  const ray = scene.createPickingRay(x, y, Matrix.Identity(), camera);
  const hit = scene.pickWithRay(ray, predicate);
  return hit?.pickedMesh;
};
