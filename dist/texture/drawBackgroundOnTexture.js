import { Colors } from "@mjt-engine/color";
import { drawOnTexture } from "./drawOnTexture";
export const drawBackgroundOnTexture = (texture, options = {}) => {
    const { color = "black" } = options;
    drawOnTexture(texture, (ctx, size) => {
        const { width, height } = size;
        ctx.fillStyle = Colors.from(color).toString();
        ctx.fillRect(0, 0, width, height);
    });
};
//# sourceMappingURL=drawBackgroundOnTexture.js.map