import { attachArcRotateCameraControls } from "./attachArcRotateCameraControls";
import { attachUniversalCameraControls } from "./attachUniversalCameraControls";
import { createTopDownCamera } from "./createTopDownCamera";
import { getArcRotateCamera } from "./getArcRotateCamera";
import { getCamera } from "./getCamera";
import { getUniversalCamera } from "./getUniversalCamera";
import { updateCamera } from "./updateCamera";
import { Camera } from "@babylonjs/core/Cameras/camera";
import { createDebugCamera } from "./createDebugCamera";
export const CAMERA_MODES = {
    orthographic: Camera.ORTHOGRAPHIC_CAMERA,
    perspective: Camera.PERSPECTIVE_CAMERA,
};
export const Cameras = {
    getArcRotateCamera,
    getCamera,
    updateCamera,
    getUniversalCamera,
    attachArcRotateCameraControls,
    attachUniversalCameraControls,
    createTopDownCamera,
    createDebugCamera,
};
//# sourceMappingURL=Cameras.js.map