import type { Scene } from "@babylonjs/core/scene";
import { stopwatch } from "../util/Timers";

export const renderOnce = (scene: Scene): Promise<void> => {
  const sw = stopwatch(`renderOnce`);
  return new Promise((resolve, reject) => {
    try {
      scene.onAfterRenderCameraObservable.addOnce(() => {
        sw();
        resolve();
      });
      scene.render(true);
    } catch (reason) {
      reject(reason);
    }
  });
};
