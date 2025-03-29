import { Mesh } from "@babylonjs/core/Meshes/mesh";
export declare const mergeMeshes: (meshes: Mesh[], options?: Partial<{
    disposeSource: boolean;
    allow32BitsIndices: boolean;
    meshSubclass: Mesh;
    subdivideWithSubMeshes: boolean;
    multiMultiMaterials: boolean;
}>) => import("@babylonjs/core").Nullable<Mesh>;
