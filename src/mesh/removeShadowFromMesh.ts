import type { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";

export const removeShadowFromMesh = (mesh: Mesh | AbstractMesh) => {
  const scene = mesh.getScene();
  mesh.dispose();
  const shadowCasters = scene.getLightsByTags("shadowCaster");
  shadowCasters.forEach((caster) => {
    const shadowGenerator = caster.metadata[
      "shadowGenerator"
    ] as ShadowGenerator;
    shadowGenerator.removeShadowCaster(mesh);
  });
};
