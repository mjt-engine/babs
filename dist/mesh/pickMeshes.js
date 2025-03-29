export const pickMeshes = (scene, x, y, options = {}) => {
    const { predicate = (mesh) => mesh.isPickable, camera = scene.activeCamera, } = options;
    if (!camera) {
        throw new Error("Camera required");
    }
    return scene.multiPick(x, y, predicate, camera);
};
//# sourceMappingURL=pickMeshes.js.map