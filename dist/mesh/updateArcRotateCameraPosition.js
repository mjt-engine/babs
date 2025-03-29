import { v3 } from "../bab/v3";
export const updateArcRotateCameraPosition = (camera, position) => {
    const currentAlpha = camera.alpha;
    const currentBeta = camera.beta;
    const currentRadius = camera.radius;
    camera.target = camera.target.add(v3(position));
    camera.radius = currentRadius;
    camera.alpha = currentAlpha;
    camera.beta = currentBeta;
};
//# sourceMappingURL=updateArcRotateCameraPosition.js.map