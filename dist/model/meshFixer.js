export const meshFixer = (mesh, mapper) => {
    mesh = mapper(mesh);
    mesh.getChildMeshes().map((m) => meshFixer(m, mapper));
    return mesh;
};
//# sourceMappingURL=meshFixer.js.map