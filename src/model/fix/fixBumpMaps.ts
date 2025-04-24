import type { Scene } from "@babylonjs/core";
import type { ModelMaterial } from "../ModelBuilder";

export const fixBumpMaps = (scene: Scene) => {
  console.log("fixing bump maps", scene.meshes);
  scene.meshes.forEach((mesh) => {
    // mesh.setEnabled(false); // TODO re-enable eyelashes when morphs fixed
    const material = mesh.material as ModelMaterial;
    if (!material) {
      return;
    }
    material.bumpTexture = null;
  });
};
