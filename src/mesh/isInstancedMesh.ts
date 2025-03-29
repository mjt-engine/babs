import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";

export const isInstancedMesh = (mesh: AbstractMesh): mesh is InstancedMesh => {
  return mesh instanceof InstancedMesh;
};
