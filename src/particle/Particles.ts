import type { IParticleSystem } from "@babylonjs/core/Particles/IParticleSystem";
import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export type SpsOptions = Partial<{ useModelMaterial: boolean }>;

export const getParticleSystem = <
  T extends IParticleSystem | SolidParticleSystem
>(
  scene: Scene,
  name: string,
  producer: () => T
) => {
  const metadata = scene.metadata ?? {};
  const spsMaybe = metadata["solidParticleSystems"]?.[name];

  if (isDefined(spsMaybe)) {
    spsMaybe;
  }

  return producer();
};

export const getSolidParticleSystem = (
  scene: Scene,
  name: string,
  options: SpsOptions = {}
): SolidParticleSystem => {
  return getParticleSystem(scene, name, () => {
    const { useModelMaterial = false } = options;
    const sps = new SolidParticleSystem(name, scene, {
      useModelMaterial,
    });

    const metadata = scene.metadata ?? {};
    scene.metadata = metadata;
    const spsMap = metadata["solidParticleSystems"] ?? {};
    metadata["solidParticleSystems"] = spsMap;
    spsMap[name] = sps;
    return sps;
  });
};

export const Particles = { getSolidParticleSystem };
