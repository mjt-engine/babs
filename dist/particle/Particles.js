import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import { isDefined } from "@mjt-engine/object";
export const getParticleSystem = (scene, name, producer) => {
    const metadata = scene.metadata ?? {};
    const spsMaybe = metadata["solidParticleSystems"]?.[name];
    if (isDefined(spsMaybe)) {
        spsMaybe;
    }
    return producer();
};
export const getSolidParticleSystem = (scene, name, options = {}) => {
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
//# sourceMappingURL=Particles.js.map