import { v3 } from "../bab/v3";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Camera } from "@babylonjs/core/Cameras/camera";
export const createTopDownCamera = (scene, name, { unitsTall = 1, unitsWide = 1, height = 100, disposeActive = false, } = {}) => {
    if (disposeActive) {
        scene?.activeCamera?.dispose();
    }
    const camera = new UniversalCamera(name, v3(0, 0, height), scene);
    camera.target = v3(0, 0, 0);
    camera.rotation = v3(0, Math.PI, Math.PI);
    camera.orthoTop = -unitsTall / 2;
    camera.orthoBottom = unitsTall / 2;
    camera.orthoLeft = -unitsWide / 2;
    camera.orthoRight = unitsWide / 2;
    // camera.detachControl();
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    return camera;
};
//# sourceMappingURL=createTopDownCamera.js.map