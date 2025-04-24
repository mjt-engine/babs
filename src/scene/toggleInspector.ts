import type { Scene } from "@babylonjs/core";

// babylon magic BS
import "@babylonjs/core";
import "@babylonjs/inspector";

export const toggleInspector = (scene: Scene) => {
  if (scene.debugLayer.isVisible()) {
    scene.debugLayer.hide();
  } else {
    scene.debugLayer.show();
  }
};
