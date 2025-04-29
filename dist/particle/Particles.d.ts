import { getSolidParticleSystem } from "./getSolidParticleSystem";
import { Sps } from "./Sps";
export type { Sps } from "./Sps";
export declare const Particles: {
    getSolidParticleSystem: (scene: import("@babylonjs/core").Scene, name: string, options: ConstructorParameters<typeof import("@babylonjs/core").SolidParticleSystem>[2]) => import("@babylonjs/core").SolidParticleSystem;
    getParticleSystem: <T extends import("..").BabParticleSystem>(scene: import("@babylonjs/core").Scene, name: string, producer: () => T) => T;
    Sps: (scene: import("@babylonjs/core").Scene, name: string, options?: Partial<{
        material: string;
        onMeshBuild: (mesh: import("@babylonjs/core").Mesh) => void;
    }> & Parameters<typeof getSolidParticleSystem>[2]) => Sps;
};
