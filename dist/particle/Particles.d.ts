import type { IParticleSystem } from "@babylonjs/core/Particles/IParticleSystem";
import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import type { Scene } from "@babylonjs/core/scene";
export type SpsOptions = Partial<{
    useModelMaterial: boolean;
}>;
export declare const getParticleSystem: <T extends IParticleSystem | SolidParticleSystem>(scene: Scene, name: string, producer: () => T) => T;
export declare const getSolidParticleSystem: (scene: Scene, name: string, options?: SpsOptions) => SolidParticleSystem;
export declare const Particles: {
    getSolidParticleSystem: (scene: Scene, name: string, options?: SpsOptions) => SolidParticleSystem;
};
