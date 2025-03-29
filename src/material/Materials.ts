import { getMaterial } from "./getMaterial";
import type { MaterialTypeMap } from "./MaterialTypeMap";
import { updateMaterial } from "./updateMaterial";
import { updateStandardMaterial } from "./updateStandardMaterial";

export type MaterialOptions = Partial<{
  type: keyof MaterialTypeMap;
}>;

export type StandardMaterialOptions = Partial<
  MaterialOptions & {
    diffuseTexture: string;
    emissiveTexture: string;
    ambientTexture: string;
    opacityTexture: string;
    diffuseColor: string;
    alpha: number;
    specularColor: string;
    ambientColor: string;
    emissiveColor: string;
  }
>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type PbrMaterialOptions = Partial<{}>;
export type AllMaterialOptions = StandardMaterialOptions & PbrMaterialOptions;

export const Materials = {
  getMaterial,
  updateMaterial,
  updateStandardMaterial,
};
