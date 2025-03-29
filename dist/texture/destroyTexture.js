export const destroyTexture = (scene, name) => {
    const tex = scene.getTextureByName(name);
    if (!tex) {
        return;
    }
    tex.dispose();
    scene.removeTexture(tex);
};
//# sourceMappingURL=destroyTexture.js.map