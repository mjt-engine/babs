import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export const getMeshAsync = <T extends Mesh | InstancedMesh>(
  scene: Scene,
  name: string,
  producer: () => Promise<T>
): Promise<T> => {
  const meshMaybe = scene.getMeshByName(name);
  if (isDefined(meshMaybe)) {
    return Promise.resolve(meshMaybe) as Promise<T>;
  }
  return producer();
};
