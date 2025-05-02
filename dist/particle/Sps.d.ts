import { Mesh as BabMesh, Scene as BabScene, SolidParticle as BabSolidParticle, SolidParticleSystem as BabSolidParticleSystem } from "@babylonjs/core";
import { getSolidParticleSystem } from "./getSolidParticleSystem";
export type Sps = {
    scene: BabScene;
    dispose: () => void;
    getInstance: () => BabSolidParticleSystem;
    rebuild: () => void;
    update: () => void;
    addMesh: (mesh: BabMesh, count?: number) => void;
    removeMesh: (mesh: BabMesh) => void;
    syncParticlestoMeshes: () => void;
    hasMesh: (meshName: string) => boolean;
    updateParticle: (name: string, fn: (particle: BabSolidParticle, index: number) => void) => void;
    updateParticleByIndex: (index: number, fn: (particle: BabSolidParticle, index: number) => void) => void;
    updateNextParticle: (fn: (particle: BabSolidParticle, index: number) => void) => void;
};
export declare const Sps: (scene: BabScene, name: string, options?: Partial<{
    material: string;
    onMeshBuild: (mesh: BabMesh) => void;
}> & Parameters<typeof getSolidParticleSystem>[2]) => Sps;
