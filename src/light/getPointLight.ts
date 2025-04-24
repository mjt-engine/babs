import type { Scene } from "@babylonjs/core";
import { v3 } from "../bab/v3";
import type { PointLightOptions } from "./Lights";
import { getLight } from "./getLight";
import { updateLight } from "./updateLight";
import { PointLight } from "@babylonjs/core";

export const getPointLight = (
  scene: Scene,
  name: string,
  options: PointLightOptions = {}
) => {
  const light = getLight(scene, name, () => {
    const { position } = options;
    return new PointLight(name, v3(position), scene);
  });
  updateLight(light, options);
  return light;
};
