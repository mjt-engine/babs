import { v3 } from "../bab/v3";
import { getLight } from "./getLight";
import { updateLight } from "./updateLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
export const getPointLight = (scene, name, options = {}) => {
    const light = getLight(scene, name, () => {
        const { position } = options;
        return new PointLight(name, v3(position), scene);
    });
    updateLight(light, options);
    return light;
};
//# sourceMappingURL=getPointLight.js.map