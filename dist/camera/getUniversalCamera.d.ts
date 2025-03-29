import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import type { Scene } from "@babylonjs/core/scene";
import type { UniversalCameraOptions } from "./Cameras";
export declare const getUniversalCamera: (scene: Scene, name: string, options?: UniversalCameraOptions) => UniversalCamera;
