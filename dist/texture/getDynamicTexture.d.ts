import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { Scene } from "@babylonjs/core/scene";
import type { DynamicTextureOptions } from "./Textures";
export declare const getDynamicTexture: (scene: Scene, name: string, options?: DynamicTextureOptions) => DynamicTexture;
