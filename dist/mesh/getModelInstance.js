import { isUndefined } from "@mjt-engine/object";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getModelInstance = (scene, name, src, options = {}) => {
    return getMesh(scene, name, () => {
        // const { radius = 0.5 } = options;
        // const mesh = MeshBuilder.CreateTorusKnot(name, { radius }, scene);
        // const mesh = loadVox(scene, src, name);
        const srcMesh = scene.getMeshByName(src);
        if (isUndefined(srcMesh)) {
            console.log({ scene, name, src });
            throw new Error(`No src mesh found for src: ${src}`);
        }
        const mesh = srcMesh.createInstance(name);
        updateMesh(scene, mesh, options);
        return mesh;
    });
};
//# sourceMappingURL=getModelInstance.js.map