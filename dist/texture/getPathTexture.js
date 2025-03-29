import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { getTexture } from "./getTexture";
import { samplingModeNumber } from "./samplingModeNumber";
import { updateTexture } from "./updateTexture";
export const getPathTexture = (scene, name, options) => {
    const texture = getTexture(scene, name, () => {
        const { src, generateMipMaps = true, samplingMode = "linearNearest", } = options;
        if (!src) {
            throw new Error("src is required", { cause: options });
        }
        const texture = new Texture(src, scene, {
            samplingMode: samplingModeNumber(samplingMode),
        });
        texture.name = name;
        return texture;
    });
    updateTexture(texture, options);
    return texture;
};
//# sourceMappingURL=getPathTexture.js.map