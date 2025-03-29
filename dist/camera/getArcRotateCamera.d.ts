import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import type { Scene } from "@babylonjs/core/scene";
import type { ArcRotateCameraOptions } from "./Cameras";
export declare const getArcRotateCamera: (scene: Scene, name: string, options?: ArcRotateCameraOptions) => ArcRotateCamera;
