import { fixEyelashes } from "./fixEyelashes";
import { fixEyes } from "./fixEyes";
import { fixBumpMaps } from "./fixBumpMaps";
export const fixDazFigure = (scene) => {
    fixEyelashes(scene);
    scene.meshes.map(fixEyes);
    fixBumpMaps(scene);
};
//# sourceMappingURL=fixDazFigure.js.map