import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core";
import { Asserts } from "@mjt-engine/assert";
import { getMeshAsync } from "./getMeshAsync";

export const getMeshInstanceAsync = async <T extends Mesh>(
  scene: Scene,
  name: string,
  rootName: string,
  producer: () => Promise<T>
) => {
  return getMeshAsync(scene, name, async () => {
    const rootMesh = await getMeshAsync(scene, rootName, producer);
    Asserts.assertValue(rootMesh, () => {
      console.log({ scene, name, rootName, producer });
      return "Unable to create mesh instance. Missing root mesh.";
    });
    return rootMesh.createInstance(name);
  });
};
