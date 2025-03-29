import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getPlane = (scene, name, options = {}) => {
    return getMesh(scene, name, () => {
        const { width = 1, height = 1, tag } = options;
        const mesh = MeshBuilder.CreatePlane(name, {
            width,
            height,
        }, scene);
        const { billboard } = options;
        if (billboard) {
            mesh.billboardMode = Mesh.BILLBOARDMODE_ALL;
        }
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getPlane.js.map