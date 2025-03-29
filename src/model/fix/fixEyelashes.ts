import { Color3 } from "@babylonjs/core/Maths/math.color";
import type { Scene } from "@babylonjs/core/scene";
import type { ModelMaterial } from "../ModelBuilder";

export const fixEyelashes = (scene: Scene) => {
  console.log("fixing eyelashes", scene.meshes);
  scene.meshes.forEach((mesh) => {
    if (mesh.name.includes("Eyelashes")) {
      console.log("fixing eyelashes", mesh.name);
      // mesh.setEnabled(false); // TODO re-enable eyelashes when morphs fixed
      if (mesh.name.includes("primitive1")) {
        console.log("fixing eyelashes: primitive1", mesh.name);
        const material = mesh.material as ModelMaterial;
        if (!material) {
          throw new Error("Mesh has no material", { cause: mesh });
        }
        const texture = material.getActiveTextures()[0];
        texture.hasAlpha = true;
        texture.getAlphaFromRGB = true;
        material.transparencyMode = 1;
        material.opacityTexture = texture;
        mesh.visibility = 0.5;
        material.albedoColor = new Color3(0, 0, 0);
      }
    }
  });
};
