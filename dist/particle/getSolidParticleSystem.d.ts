import { type Scene, SolidParticleSystem } from "@babylonjs/core";
import { BabScene } from "../type/BabScene";
import { BabSolidParticleSystem } from "../type/BabParticleSystem";
export declare const getSolidParticleSystem: (scene: Scene, name: string, options: ConstructorParameters<typeof SolidParticleSystem>[2]) => SolidParticleSystem;
export declare const buildSpsFromSchadowScene: ({ sps, shadowScene, liveScene, }: {
    sps: BabSolidParticleSystem;
    shadowScene: BabScene;
    liveScene: BabScene;
}) => void;
