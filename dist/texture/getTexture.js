import { isDefined } from "@mjt-engine/object";
export const getTexture = (scene, name, producer) => {
    const texture = scene.getTextureByName(name);
    if (isDefined(texture)) {
        return texture;
    }
    return producer();
};
//# sourceMappingURL=getTexture.js.map