import type { Light } from "@babylonjs/core/Lights/light";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export const getLight = <T extends Light>(
  scene: Scene,
  name: string,
  producer: () => T
) => {
  const light = scene.getLightByName(name);
  if (isDefined(light)) {
    return light as T;
  }
  return producer();
};
