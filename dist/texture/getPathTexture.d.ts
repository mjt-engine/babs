import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Scene } from "@babylonjs/core/scene";
import type { PathTextureOptions } from "./Textures";
export declare const getPathTexture: (scene: Scene, name: string, options: PathTextureOptions) => Texture;
