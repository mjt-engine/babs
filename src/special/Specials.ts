import { Constants } from "@babylonjs/core";
import { GlowLayer, type IGlowLayerOptions } from "@babylonjs/core";
import { Color4 } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";

export const addGlowLayer = (
  scene: Scene,
  name: string,
  options: Partial<IGlowLayerOptions> = {}
) => {
  const gl = new GlowLayer(name, scene, options);
  gl.neutralColor = new Color4(0, 0, 0, 0);
  return gl;
};

export const Specials = {
  addGlowLayer,
  Constants,
};
