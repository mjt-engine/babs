import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export const getCamera = <T extends Camera>(
  scene: Scene,
  name: string,
  producer: () => T
) => {
  const camera = scene.getCameraByName(name);
  if (isDefined(camera)) {
    return camera as T;
  }
  return producer();
};
