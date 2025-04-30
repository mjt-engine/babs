import type { Camera } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const getCamera: <T extends Camera>(scene: Scene, name: string, producer: () => T) => T;
