import { Mesh } from "@babylonjs/core/Meshes/mesh";
export const mergeMeshes = (meshes, options = {}) => {
    const { disposeSource = false, allow32BitsIndices = true, meshSubclass = undefined, subdivideWithSubMeshes = false, multiMultiMaterials = false, } = options;
    const mergedMesh = Mesh.MergeMeshes(meshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterials);
    return mergedMesh;
};
//# sourceMappingURL=mergeMeshes.js.map