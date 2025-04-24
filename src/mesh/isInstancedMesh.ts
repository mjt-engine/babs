import type { AbstractMesh } from "@babylonjs/core";
import { InstancedMesh } from "@babylonjs/core";

export const isInstancedMesh = (mesh: AbstractMesh): mesh is InstancedMesh => {
  return mesh instanceof InstancedMesh;
};
