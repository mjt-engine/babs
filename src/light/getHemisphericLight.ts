import { HemisphericLight } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { v3 } from "../bab/v3";
import type { HemisphericLightOptions } from "./Lights";
import { getLight } from "./getLight";
import { updateLight } from "./updateLight";

export const getHemisphericLight = (
  scene: Scene,
  name: string,
  options: HemisphericLightOptions = {}
) => {
  const light = getLight(scene, name, () => {
    const { direction } = options;
    return new HemisphericLight(name, v3(direction), scene);
  });
  updateLight(light, options);
  return light;
};
