import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { isUndefined } from "@mjt-engine/object";
import { getMaterial } from "../material/getMaterial";
import { updateMesh } from "./updateMesh";
export const getBoxInstance = (scene, name, options) => {
    const { width = 1, height = 1, depth = 1, material, receiveShadows = false, } = options;
    // return getMesh(scene, name, () => {
    const rootName = `box-instance-root-${JSON.stringify([
        width,
        height,
        depth,
        material,
        receiveShadows,
    ])}`;
    let rootMesh = scene.getMeshByName(rootName);
    if (isUndefined(rootMesh)) {
        rootMesh = MeshBuilder.CreateBox(rootName, { width, height, depth }, scene);
        rootMesh.receiveShadows = receiveShadows;
        rootMesh.isVisible = false;
        if (!material) {
            throw new Error("No material", { cause: options });
        }
        rootMesh.material = getMaterial(scene, material, "standard");
    }
    const mesh = rootMesh.createInstance(name);
    updateMesh(scene, mesh, options);
    return mesh;
    // });
};
//# sourceMappingURL=getBoxInstance.js.map