import type { MaterialTypeMap } from "./MaterialTypeMap";
import type { AllMaterialOptions } from "./Materials";
import type { Scene } from "@babylonjs/core/scene";
type VisualMaterialType = keyof MaterialTypeMap;
export declare const getMaterial: <T extends VisualMaterialType = VisualMaterialType>(scene: Scene, name: string, options?: T | AllMaterialOptions) => MaterialTypeMap[T];
export {};
