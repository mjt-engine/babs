import type { Material } from "@babylonjs/core/Materials/material";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Scene } from "@babylonjs/core/scene";
import type { AllMaterialOptions } from "./Materials";
import { updateStandardMaterial } from "./updateStandardMaterial";

export const updateMaterial = (
  scene: Scene,
  material: Material,
  options: AllMaterialOptions
) => {
  if (material instanceof StandardMaterial) {
    updateStandardMaterial(scene, material, options);
  }
};
