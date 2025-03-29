import { Scene } from "@babylonjs/core/scene";
export const walkMeshes = (mesh, walker) => {
    if (mesh instanceof Scene) {
        return mesh.meshes.forEach((m) => walkMeshes(m, walker));
    }
    walker(mesh);
    mesh.getChildMeshes().forEach((m) => walkMeshes(m, walker));
};
//# sourceMappingURL=walkMeshes.js.map