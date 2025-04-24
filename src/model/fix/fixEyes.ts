import type { PBRMaterial } from "@babylonjs/core";
import type { AbstractMesh } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";
export const HIDE = [
  // "Irises",
  // "Pupils",
  // "Sclera", // 'red' of the eye
  // "Cornea",
  // "Eyelashes",
  // "EyeMoisture",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
];

export const GLOSS = [
  "Irises",
  "Pupils",
  "Sclera",
  // "Eyelashes",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
];

export const fixEyes = (mesh: AbstractMesh) => {
  // console.log(mesh.name);
  const textures = mesh?.material?.getActiveTextures() ?? [];
  // textures.map((t) => console.log("texture: " + t?.name));
  if (
    isDefined(
      textures.find((t) => {
        const name = t?.name;
        return isDefined(HIDE.find((h) => name.includes(h)));
      })
    )
  ) {
    mesh.visibility = 0;
  }

  // gloss meshes
  if (
    isDefined(
      textures.find((t) => {
        const name = t?.name;
        return isDefined(GLOSS.find((h) => name.includes(h)));
      })
    )
  ) {
    const material = mesh.material as PBRMaterial;
    material.metallic = 1;
    material.transparencyMode = 2;

    // material.subSurface.isScatteringEnabled = true;
    // material.subSurface.scatteringDiffusionProfile = c3("white");
    // material.albedoTexture.hasAlpha = true;
    // material.roughness = 0.5;
    // material.albedoColor = c3('green')
    // material.emissiveIntensity = 1;
    // material.emissiveColor = c3("white");
    // material.emissiveTexture = material.albedoTexture;
    // material.roughness = 0;
    if (material.albedoTexture) {
      material.albedoTexture.hasAlpha = true;
    }
    material.clearCoat.isEnabled = true;
    material.clearCoat.intensity = 0.2;
    material.subSurface.isTranslucencyEnabled = true;
    material.subSurface.translucencyIntensity = 0.5;
    material.subSurface.translucencyIntensityTexture = material.albedoTexture;
    material.opacityTexture = material.albedoTexture;
    // mesh.visibility = 0;
    // material.emissiveTexture = material.albedoTexture;
    // material.albedoColor = c3("red");
  }

  // moisture?
  if (mesh.name === "Genesis8Female.Shape_primitive10") {
    const material = mesh.material as PBRMaterial;
    material.metallic = 0;
    mesh.visibility = 0;
    // // material.zOffset = -1;
    // // material.roughness = 0.5;
    // // material.clearCoat.isEnabled = true;
    // // material.clearCoat.intensity = 1;
    // // material.useLogarithmicDepth = true;

    // // material.subSurface.isScatteringEnabled = true;
    // // material.subSurface.scatteringDiffusionProfile = c3("grey");

    // material.transparencyMode = 2;
    // material.clearCoat.isEnabled = true;
    // material.clearCoat.intensity = 0.3;
    // material.subSurface.isTranslucencyEnabled = true;
    // material.subSurface.translucencyIntensity = 1;
    // material.subSurface.translucencyIntensityTexture = material.albedoTexture;
    // // material.albedoTexture.hasAlpha = true;

    // // visibility controls the 'redness' of the eyes
    // mesh.visibility = 0.4;
    // // mesh.setEnabled(false);
  }

  // pupil mask (water layer)
  if (mesh.name === "Genesis8Female.Shape_primitive12") {
    const material = mesh.material as PBRMaterial;
    // material.metallic = 1;
    material.roughness = 0;
    material.clearCoat.isEnabled = true;
    material.clearCoat.intensity = 0.5;
    material.subSurface.isTranslucencyEnabled = true;
    material.subSurface.translucencyIntensity = 0.5;
    material.subSurface.translucencyIntensityTexture = material.albedoTexture;
    // can have the 'effect' of clouding/ disapering the iris/pupil
    mesh.visibility = 0;
    mesh.setEnabled(false);
    // mesh.visibility = 1;
  }

  // iris
  if (mesh.name === "Genesis8Female.Shape_primitive13") {
    const material = mesh.material as PBRMaterial;
    material.metallic = 0;
  }

  // sclarera
  if (mesh.name === "Genesis8Female.Shape_primitive14") {
    const material = mesh.material as PBRMaterial;
    material.opacityTexture = null;
    material.metallic = 0;
    material.useAlphaFromAlbedoTexture = false;
    if (material.albedoTexture) {
      material.albedoTexture.level = 3;
    }
  }
  // bottom edge of eyelid
  if (mesh.name.endsWith("Eyelashes.Shape_primitive0")) {
    const material = mesh.material as PBRMaterial;
    // material.metallic = 1;
    material.roughness = 0.5;
    material.clearCoat.isEnabled = true;
    material.clearCoat.intensity = 0.5;
    material.subSurface.isTranslucencyEnabled = true;
    material.subSurface.translucencyIntensity = 0.5;
    material.subSurface.translucencyIntensityTexture = material.albedoTexture;
    // material.albedoColor = new Color3(0.5, 0.5, 0.5);
    mesh.visibility = 0.2;
    // mesh.visibility = 0.5;
    // mesh.visibility = 0.5;
  }

  mesh.getChildMeshes().map(fixEyes);
};
