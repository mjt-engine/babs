import { isDefined } from "@mjt-engine/object";
import type { MaterialTypeMap } from "./MaterialTypeMap";
import { updateMaterial } from "./updateMaterial";
import type { AllMaterialOptions } from "./Materials";
import type { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";

type VisualMaterialType = keyof MaterialTypeMap;

export const getMaterial = <T extends VisualMaterialType = VisualMaterialType>(
  scene: Scene,
  name: string,
  options: T | AllMaterialOptions = "standard"
): MaterialTypeMap[T] => {
  const material = scene.getMaterialByName(name);
  if (isDefined(material)) {
    // updateMaterial(scene, material, options);
    return material as MaterialTypeMap[T];
  }

  const type =
    typeof options === "string" ? options : options?.type ?? "standard";

  switch (type) {
    case "standard": {
      const material = new StandardMaterial(name, scene) as MaterialTypeMap[T];
      updateMaterial(scene, material, options);
      return material;
    }
    case "pbr": {
      const material = new PBRMaterial(name, scene) as MaterialTypeMap[T];
      updateMaterial(scene, material, options);
      return material;
    }
    default: {
      throw new Error(`Unknown material type: '${type}'`);
    }
  }
};
