import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";

export const pickMeshes = (
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
  if (!camera) {
    throw new Error("Camera required");
  }
  return scene.multiPick(x, y, predicate, camera);
};
