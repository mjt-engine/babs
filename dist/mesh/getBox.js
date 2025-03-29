import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { isDefined } from "@mjt-engine/object";
import { c4 } from "../bab/c4";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getBox = (scene, name, options = {}) => {
    return getMesh(scene, name, () => {
        const { width = 1, height = 1, depth = 1, colors } = options;
        const mesh = MeshBuilder.CreateBox(name, {
            width,
            height,
            depth,
            faceColors: isDefined(colors) ? colors.map(c4) : undefined,
        }, scene);
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getBox.js.map