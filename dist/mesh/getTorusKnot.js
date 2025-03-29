import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getTorusKnot = (scene, name, options = {}) => {
    return getMesh(scene, name, () => {
        const { radius = 0.5 } = options;
        const mesh = MeshBuilder.CreateTorusKnot(name, { radius }, scene);
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getTorusKnot.js.map