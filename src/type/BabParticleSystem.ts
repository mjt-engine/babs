import { type IParticleSystem, SolidParticleSystem } from "@babylonjs/core";
export type { SolidParticleSystem as BabSolidParticleSystem } from "@babylonjs/core";

export type BabParticleSystem = IParticleSystem | SolidParticleSystem;
