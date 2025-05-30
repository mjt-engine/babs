import { UniversalCamera } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import type { UniversalCameraOptions } from "./Cameras";
export declare const getUniversalCamera: (scene: Scene, name: string, options?: UniversalCameraOptions) => UniversalCamera;
