export const removeShadowFromMesh = (mesh) => {
    const scene = mesh.getScene();
    mesh.dispose();
    const shadowCasters = scene.getLightsByTags("shadowCaster");
    shadowCasters.forEach((caster) => {
        const shadowGenerator = caster.metadata["shadowGenerator"];
        shadowGenerator.removeShadowCaster(mesh);
    });
};
//# sourceMappingURL=removeShadowFromMesh.js.map