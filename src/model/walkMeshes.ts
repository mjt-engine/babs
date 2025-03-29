import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Scene } from "@babylonjs/core/scene";

export const walkMeshes = (
  mesh: AbstractMesh | Scene,
  walker: (mesh: AbstractMesh) => void
): void => {
  if (mesh instanceof Scene) {
    return mesh.meshes.forEach((m) => walkMeshes(m, walker));
  }
  walker(mesh);
  mesh.getChildMeshes().forEach((m) => walkMeshes(m, walker));
};
