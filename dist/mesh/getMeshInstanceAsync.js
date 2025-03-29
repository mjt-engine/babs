import { Asserts } from "@mjt-engine/assert";
import { getMeshAsync } from "./getMeshAsync";
export const getMeshInstanceAsync = async (scene, name, rootName, producer) => {
    return getMeshAsync(scene, name, async () => {
        const rootMesh = await getMeshAsync(scene, rootName, producer);
        Asserts.assertValue(rootMesh, () => {
            console.log({ scene, name, rootName, producer });
            return "Unable to create mesh instance. Missing root mesh.";
        });
        return rootMesh.createInstance(name);
    });
};
//# sourceMappingURL=getMeshInstanceAsync.js.map