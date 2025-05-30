import { HemisphericLight } from "@babylonjs/core";
import type { Light } from "@babylonjs/core";
import { PointLight } from "@babylonjs/core";
import { iff } from "@mjt-engine/object";
import { v3 } from "../bab/v3";
import type { AllLightOptions } from "./Lights";

export const updateLight = (light: Light, options: AllLightOptions) => {
  const { intensity, direction, position } = options;
  iff(intensity, (value) => {
    light.intensity = value;
  });

  if (light instanceof HemisphericLight) {
    iff(direction, (value) => {
      light.direction = v3(value);
    });
  }

  if (light instanceof PointLight) {
    iff(position, (value) => {
      light.position = v3(value);
    });
  }
};
