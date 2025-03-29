import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import type { TextureLayer } from "./TextureLayer";
export declare const imageLayersToScene: (layers: TextureLayer[], engine: Engine) => Promise<Scene>;
