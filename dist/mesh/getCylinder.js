import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getCylinder = (scene, name, options = {}) => {
    return getMesh(scene, name, () => {
        const { arc = 1, height = 1, radius = 0.5, tag } = options;
        const mesh = MeshBuilder.CreateCylinder(name, {
            height,
            arc,
            diameter: radius * 2,
        }, scene);
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getCylinder.js.map