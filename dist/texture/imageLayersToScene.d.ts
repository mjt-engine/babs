import type { Engine } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
import type { TextureLayer } from "./TextureLayer";
export declare const imageLayersToScene: (layers: TextureLayer[], engine: Engine) => Promise<Scene>;
