import { Mesh } from "@babylonjs/core/Meshes/mesh";

export const mergeMeshes = (
  meshes: Mesh[],
  options: Partial<{
    disposeSource: boolean;
    allow32BitsIndices: boolean;
    meshSubclass: Mesh;
    subdivideWithSubMeshes: boolean;
    multiMultiMaterials: boolean;
  }> = {}
) => {
  const {
    disposeSource = false,
    allow32BitsIndices = true,
    meshSubclass = undefined,
    subdivideWithSubMeshes = false,
    multiMultiMaterials = false,
  } = options;
  const mergedMesh = Mesh.MergeMeshes(
    meshes as Mesh[],
    disposeSource,
    allow32BitsIndices,
    meshSubclass,
    subdivideWithSubMeshes,
    multiMultiMaterials
  );

  return mergedMesh;
};
