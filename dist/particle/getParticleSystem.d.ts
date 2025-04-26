import { type Scene } from "@babylonjs/core";
import { BabScene } from "../type/BabScene";
import { BabParticleSystem } from "../type/BabParticleSystem";
export declare const getSolidParticleSystemsMetadata: (scene: BabScene) => Record<string, BabParticleSystem>;
export declare const getParticleSystem: <T extends BabParticleSystem>(scene: Scene, name: string, producer: () => T) => T;
