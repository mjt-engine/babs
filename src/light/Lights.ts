import type { Vec3 } from "@mjt-engine/math";
import { getHemisphericLight } from "./getHemisphericLight";
import { getLight } from "./getLight";
import { getPointLight } from "./getPointLight";
import { updateLight } from "./updateLight";

export type LightOptions = Partial<{ intensity: number }>;
export type HemisphericLightOptions = Partial<
  LightOptions & { direction: Vec3 }
>;
export type PointLightOptions = Partial<LightOptions & { position: Vec3 }>;

export type AllLightOptions = LightOptions &
  HemisphericLightOptions &
  PointLightOptions;

export const Lights = {
  getLight,
  getHemisphericLight,
  getPointLight,
  updateLight,
};
