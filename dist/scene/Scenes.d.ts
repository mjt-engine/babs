import type { Engine } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
export declare const createScene: (engine: Engine) => Scene;
export declare const Scenes: {
    createScene: (engine: Engine) => Scene;
    toggleInspector: (scene: Scene) => void;
};
