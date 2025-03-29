import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import type { Scene } from "@babylonjs/core/scene";
import type { VoxData } from "@mjt-engine/magica-voxels";
export declare const voxDataToSps: (scene: Scene, voxData: VoxData, name: string) => SolidParticleSystem;
