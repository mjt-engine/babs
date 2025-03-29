import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture";
import type { Scene } from "@babylonjs/core/scene";
export declare const getTexture: <T extends BaseTexture>(scene: Scene, name: string, producer: () => T) => T;
