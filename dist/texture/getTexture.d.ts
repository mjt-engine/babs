import type { BaseTexture } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const getTexture: <T extends BaseTexture>(scene: Scene, name: string, producer: () => T) => T;
