import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getSphere = (scene, name, options) => {
    const { radius = 0.5 } = options;
    return getMesh(scene, name, () => {
        const mesh = MeshBuilder.CreateSphere(name, { diameter: radius * 2 }, scene);
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getSphere.js.map