import type { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

export type MaterialTypeMap = {
  standard: StandardMaterial;
  pbr: PBRMaterial;
};
