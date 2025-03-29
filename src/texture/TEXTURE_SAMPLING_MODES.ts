import { Texture } from "@babylonjs/core/Materials/Textures/texture";

export const TEXTURE_SAMPLING_MODES = {
  linearNearest: Texture.LINEAR_NEAREST,
  nearestNearest: Texture.NEAREST_NEAREST,
  linearLinear: Texture.LINEAR_LINEAR,
  nearestLinear: Texture.NEAREST_LINEAR,
};
