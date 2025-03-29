import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Scene } from "@babylonjs/core/scene";
export declare const imageToTexture: (scene: Scene, name: string, image: string | HTMLImageElement | HTMLCanvasElement | OffscreenCanvas) => Promise<Texture>;
