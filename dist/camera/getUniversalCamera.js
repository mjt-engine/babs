import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { v3 } from "../bab/v3";
import { getCamera } from "./getCamera";
import { updateCamera } from "./updateCamera";
export const getUniversalCamera = (scene, name, options = {}) => {
    const camera = getCamera(scene, name, () => {
        const { position } = options;
        return new UniversalCamera(name, v3(position), scene);
    });
    updateCamera(camera, options);
    return camera;
};
//# sourceMappingURL=getUniversalCamera.js.map