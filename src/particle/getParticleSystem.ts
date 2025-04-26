import { type Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";
import { BabScene } from "../type/BabScene";
import { BabParticleSystem } from "../type/BabParticleSystem";

export const getSolidParticleSystemsMetadata = (
  scene: BabScene
): Record<string, BabParticleSystem> => {
  const metadata = scene.metadata ?? {};
  const spsMetadata = metadata["solidParticleSystems"] ?? {};

  if (isDefined(spsMetadata)) {
    return spsMetadata;
  }
  scene.metadata = {
    ...metadata,
    solidParticleSystems: {},
  };

  return spsMetadata;
};

export const getParticleSystem = <T extends BabParticleSystem>(
  scene: Scene,
  name: string,
  producer: () => T
): T => {
  const spsMetadata = getSolidParticleSystemsMetadata(scene);
  const spsMaybe = spsMetadata[name];

  if (isDefined(spsMaybe)) {
    spsMaybe as T;
  }
  const result = producer();
  spsMetadata[name] = result;
  return result;
};
