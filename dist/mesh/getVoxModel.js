import { isUndefined } from "@mjt-engine/object";
import { voxDataToSps } from "../voxel/voxDataToSps";
import { updateMesh } from "./updateMesh";
export const getVoxModel = (scene, name, src, options = {}) => {
    // return getMesh(scene, name, () => {
    const metadata = scene.metadata ?? {};
    const { voxes = {} } = metadata;
    const voxData = voxes[src];
    if (isUndefined(voxData)) {
        console.log({ scene, name, src });
        throw new Error(`No voxData found for ${src} ${name}`);
    }
    const sps = voxDataToSps(scene, voxData, name);
    const mesh = sps.mesh;
    // sps.mesh.setEnabled(false);
    // const { merged = true } = options;
    // const mesh = merged
    //   ? voxDataToMergedModel(scene, voxData, name)
    //   : voxDataToComplexModel(scene, voxData, name);
    updateMesh(scene, mesh, options);
    return sps;
    // });
};
//# sourceMappingURL=getVoxModel.js.map