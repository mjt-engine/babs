import type { Scene } from "@babylonjs/core/scene";
import { isDefined, isUndefined } from "@mjt-engine/object";
import type { MorphRemaps } from "./ModelBuilder";
import { findInfluenceValue } from "./findInfluenceValue";

export const performMorph = (
  scene: Scene,
  influences: Record<string, number>,
  remaps: MorphRemaps
) => {
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
  const influenceEntries = Object.entries(updatedInfluences).map(
    ([key, value]) => [key.toLowerCase(), value] as [string, number]
  );
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
