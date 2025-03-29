import { isDefined } from "@mjt-engine/object";
export const getLight = (scene, name, producer) => {
    const light = scene.getLightByName(name);
    if (isDefined(light)) {
        return light;
    }
    return producer();
};
//# sourceMappingURL=getLight.js.map