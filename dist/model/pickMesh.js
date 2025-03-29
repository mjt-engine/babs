import { Matrix } from "@babylonjs/core/Maths/math.vector";
export const pickMesh = (scene, x, y, options = {}) => {
    const { camera = scene.activeCamera, predicate = () => true } = options;
    const ray = scene.createPickingRay(x, y, Matrix.Identity(), camera);
    const hit = scene.pickWithRay(ray, predicate);
    return hit?.pickedMesh;
};
//# sourceMappingURL=pickMesh.js.map