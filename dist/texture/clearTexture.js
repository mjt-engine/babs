import { drawOnTexture } from "./drawOnTexture";
export const clearTexture = (texture) => {
    drawOnTexture(texture, (ctx, size) => {
        const { width, height } = size;
        ctx.clearRect(0, 0, width, height);
    });
};
//# sourceMappingURL=clearTexture.js.map