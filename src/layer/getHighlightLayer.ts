import type { IHighlightLayerOptions } from "@babylonjs/core";
import { HighlightLayer } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const getHighlightLayer = <T extends HighlightLayer>(
  scene: Scene,
  name: string,
  options?: IHighlightLayerOptions
) => {
  const layerMaybe = scene.getHighlightLayerByName(name);
  if (isDefined(layerMaybe)) {
    return layerMaybe;
  }
  return new HighlightLayer(name, scene, options);
};
