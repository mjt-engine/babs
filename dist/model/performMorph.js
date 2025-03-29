import { isDefined, isUndefined } from "@mjt-engine/object";
import { findInfluenceValue } from "./findInfluenceValue";
export const performMorph = (scene, influences, remaps) => {
    const updatedInfluences = { ...influences };
    Object.entries(remaps).forEach((remap) => {
        const [remapName, realNames] = remap;
        const remapValue = updatedInfluences[remapName];
        if (isUndefined(remapValue)) {
            return;
        }
        realNames.forEach((realName) => {
            updatedInfluences[realName] = remapValue;
        });
    });
    const influenceEntries = Object.entries(updatedInfluences).map(([key, value]) => [key.toLowerCase(), value]);
    scene.morphTargetManagers.forEach((manager) => {
        for (let i = 0; i < manager.numTargets; i++) {
            const target = manager.getTarget(i);
            const value = findInfluenceValue(influenceEntries, target?.name);
            if (isDefined(value) && target.influence !== value) {
                target.influence = value;
            }
        }
    });
};
//# sourceMappingURL=performMorph.js.map