import type { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { removeShadowFromMesh } from "../mesh/removeShadowFromMesh";

export const addShadowToMesh = (mesh: Mesh | InstancedMesh) => {
  const scene = mesh.getScene();
  const shadowCasters = scene.getLightsByTags("shadowCaster");
  shadowCasters.forEach((caster) => {
    const shadowGenerator = caster.metadata[
      "shadowGenerator"
    ] as ShadowGenerator;
    shadowGenerator.addShadowCaster(mesh);
  });
  return () => {
    removeShadowFromMesh(mesh);
  };
};
