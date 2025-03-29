import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { iff } from "@mjt-engine/object";
import { v3 } from "../bab/v3";
export const updateLight = (light, options) => {
    const { intensity, direction, position } = options;
    iff(intensity, (value) => {
        light.intensity = value;
    });
    if (light instanceof HemisphericLight) {
        iff(direction, (value) => {
            light.direction = v3(value);
        });
    }
    if (light instanceof PointLight) {
        iff(position, (value) => {
            light.position = v3(value);
        });
    }
};
//# sourceMappingURL=updateLight.js.map