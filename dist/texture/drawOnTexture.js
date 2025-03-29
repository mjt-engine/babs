export const drawOnTexture = (texture, render) => {
    const size = texture.getSize();
    const ctx = texture.getContext();
    render(ctx, size);
    texture.update();
};
//# sourceMappingURL=drawOnTexture.js.map