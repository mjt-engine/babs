import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { Scene } from "@babylonjs/core/scene";
export declare const getCamera: <T extends Camera>(scene: Scene, name: string, producer: () => T) => T;
