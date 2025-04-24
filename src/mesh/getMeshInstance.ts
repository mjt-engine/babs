import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core";
import { Asserts } from "@mjt-engine/assert";
import { getMesh } from "./getMesh";

export const getMeshInstance = <T extends Mesh>(
  scene: Scene,
  name: string,
  rootName: string,
  producer: () => T
) => {
  return getMesh(scene, name, () => {
    const rootMesh = getMesh(scene, rootName, producer);
    Asserts.assertValue(rootMesh, () => {
      console.log({ scene, name, rootName, producer });
      return "Unable to create mesh instance. Missing root mesh.";
    });
    return rootMesh.createInstance(name);
  });
};
