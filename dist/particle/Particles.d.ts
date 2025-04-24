import type { IParticleSystem } from "@babylonjs/core";
import { SolidParticleSystem } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export type SpsOptions = Partial<{
    useModelMaterial: boolean;
}>;
export declare const getParticleSystem: <T extends IParticleSystem | SolidParticleSystem>(scene: Scene, name: string, producer: () => T) => T;
export declare const getSolidParticleSystem: (scene: Scene, name: string, options?: SpsOptions) => SolidParticleSystem;
export declare const Particles: {
    getSolidParticleSystem: (scene: Scene, name: string, options?: SpsOptions) => SolidParticleSystem;
};
