import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import { isUndefined } from "@mjt-engine/object";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getModelInstance = (
  scene: Scene,
  name: string,
  src: string,

  options: MeshOptions = {}
) => {
  return getMesh(scene, name, () => {
    // const { radius = 0.5 } = options;
    // const mesh = MeshBuilder.CreateTorusKnot(name, { radius }, scene);
    // const mesh = loadVox(scene, src, name);
    const srcMesh = scene.getMeshByName(src) as Mesh;
    if (isUndefined(srcMesh)) {
      console.log({ scene, name, src });
      throw new Error(`No src mesh found for src: ${src}`);
    }
    const mesh = srcMesh.createInstance(name);
    updateMesh(scene, mesh, options);
    return mesh;
  });
};
