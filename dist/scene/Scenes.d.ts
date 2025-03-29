import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
export declare const createScene: (engine: Engine) => Scene;
export declare const Scenes: {
    createScene: (engine: Engine) => Scene;
    toggleInspector: (scene: Scene) => void;
};
