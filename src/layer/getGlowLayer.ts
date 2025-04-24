import {
  GlowLayer,
  type IGlowLayerOptions,
} from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const getGlowLayer = (
  scene: Scene,
  name: string,
  options?: IGlowLayerOptions
) => {
  // workaround Bug in getGlowlayerbyName
  const layerMaybe = scene?.effectLayers?.length
    ? scene.getGlowLayerByName(name)
    : undefined;
  if (isDefined(layerMaybe)) {
    return layerMaybe;
  }
  return new GlowLayer(name, scene, options);
};
