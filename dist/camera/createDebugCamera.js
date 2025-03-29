import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Camera } from "@babylonjs/core/Cameras/camera";
import { v3 } from "../bab/v3";
export const createDebugCamera = (scene, name) => {
    scene?.activeCamera?.dispose();
    const canvas = scene.getEngine().getRenderingCanvas();
    const alpha = -Math.PI / 2;
    const beta = Math.PI / 2.5;
    const camera = new ArcRotateCamera(name, alpha, beta, 15, v3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.mode = Camera.PERSPECTIVE_CAMERA;
};
//# sourceMappingURL=createDebugCamera.js.map