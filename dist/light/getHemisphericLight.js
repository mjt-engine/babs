import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { v3 } from "../bab/v3";
import { getLight } from "./getLight";
import { updateLight } from "./updateLight";
export const getHemisphericLight = (scene, name, options = {}) => {
    const light = getLight(scene, name, () => {
        const { direction } = options;
        return new HemisphericLight(name, v3(direction), scene);
    });
    updateLight(light, options);
    return light;
};
//# sourceMappingURL=getHemisphericLight.js.map