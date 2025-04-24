import type { Material } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
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
