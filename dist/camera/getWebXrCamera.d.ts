import { type Scene, WebXRCamera } from "@babylonjs/core";
import type { BabWebXRSessionManager, WebXrCameraOptions } from "./Cameras";
export declare const getWebXrCamera: (scene: Scene, name: string, xrSessionManager: BabWebXRSessionManager, options?: WebXrCameraOptions) => WebXRCamera;
