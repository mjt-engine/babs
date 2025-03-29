import { Asserts } from "@mjt-engine/assert";
import { getMesh } from "./getMesh";
export const getMeshInstance = (scene, name, rootName, producer) => {
    return getMesh(scene, name, () => {
        const rootMesh = getMesh(scene, rootName, producer);
        Asserts.assertValue(rootMesh, () => {
            console.log({ scene, name, rootName, producer });
            return "Unable to create mesh instance. Missing root mesh.";
        });
        return rootMesh.createInstance(name);
    });
};
//# sourceMappingURL=getMeshInstance.js.map