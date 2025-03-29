import type { IHighlightLayerOptions } from "@babylonjs/core/Layers/highlightLayer";
import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import type { Scene } from "@babylonjs/core/scene";
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
