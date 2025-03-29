import { Constants } from "@babylonjs/core/Engines/constants";
import {
  GlowLayer,
  type IGlowLayerOptions,
} from "@babylonjs/core/Layers/glowLayer";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import type { Scene } from "@babylonjs/core/scene";

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
