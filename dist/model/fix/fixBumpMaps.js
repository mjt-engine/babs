export const fixBumpMaps = (scene) => {
    console.log("fixing bump maps", scene.meshes);
    scene.meshes.forEach((mesh) => {
        // mesh.setEnabled(false); // TODO re-enable eyelashes when morphs fixed
        const material = mesh.material;
        if (!material) {
            return;
        }
        material.bumpTexture = null;
    });
};
//# sourceMappingURL=fixBumpMaps.js.map