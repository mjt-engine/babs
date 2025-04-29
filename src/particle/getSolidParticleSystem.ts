import { SolidParticleSystem } from "@babylonjs/core";
import { BabScene } from "../type/BabScene";
import { getParticleSystem } from "./getParticleSystem";

export const getSolidParticleSystem = (
  scene: BabScene,
  name: string,
  options: ConstructorParameters<typeof SolidParticleSystem>[2]
): SolidParticleSystem => {
  return getParticleSystem(scene, name, () => {
    return new SolidParticleSystem(name, scene, {
      ...options,
    });
  });
};
