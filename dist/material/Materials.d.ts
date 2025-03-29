import type { MaterialTypeMap } from "./MaterialTypeMap";
export type MaterialOptions = Partial<{
    type: keyof MaterialTypeMap;
}>;
export type StandardMaterialOptions = Partial<MaterialOptions & {
    diffuseTexture: string;
    emissiveTexture: string;
    ambientTexture: string;
    opacityTexture: string;
    diffuseColor: string;
    alpha: number;
    specularColor: string;
    ambientColor: string;
    emissiveColor: string;
}>;
export type PbrMaterialOptions = Partial<{}>;
export type AllMaterialOptions = StandardMaterialOptions & PbrMaterialOptions;
export declare const Materials: {
    getMaterial: <T extends keyof MaterialTypeMap = keyof MaterialTypeMap>(scene: import("@babylonjs/core").Scene, name: string, options?: T | AllMaterialOptions) => MaterialTypeMap[T];
    updateMaterial: (scene: import("@babylonjs/core").Scene, material: import("@babylonjs/core").Material, options: AllMaterialOptions) => void;
    updateStandardMaterial: (scene: import("@babylonjs/core").Scene, material: import("@babylonjs/core").StandardMaterial, options: AllMaterialOptions) => void;
};
