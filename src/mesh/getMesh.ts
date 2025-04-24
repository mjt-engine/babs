import type { InstancedMesh } from "@babylonjs/core";
import type { Mesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const getMesh = <T extends Mesh | InstancedMesh>(
  scene: Scene,
  name: string,
  producer: (instance?: T) => T,
  updatable: boolean = false
): T => {
  const meshMaybe = scene.getMeshByName(name);
  if (isDefined(meshMaybe) && !updatable) {
    return meshMaybe as T;
  }
  if (isDefined(meshMaybe) && updatable) {
    return producer(meshMaybe as T) as T;
  }
  return producer();
};
