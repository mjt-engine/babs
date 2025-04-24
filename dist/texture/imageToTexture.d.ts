import { Texture } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const imageToTexture: (scene: Scene, name: string, image: string | HTMLImageElement | HTMLCanvasElement | OffscreenCanvas) => Promise<Texture>;
