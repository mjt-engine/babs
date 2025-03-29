export const groupMeshesByMaterial = (meshes) => {
    const result = {};
    meshes.forEach((mesh) => {
        const materialName = mesh?.material?.name;
        if (!materialName) {
            throw new Error("Mesh material is missing name", { cause: mesh });
        }
        const meshes = result[materialName] ?? [];
        meshes.push(mesh);
        result[materialName] = meshes;
    });
    return result;
};
//# sourceMappingURL=groupMeshesByMaterial.js.map