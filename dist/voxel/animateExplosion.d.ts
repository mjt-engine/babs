import type { SolidParticle } from "@babylonjs/core";
import { type NextRandom } from "@mjt-engine/random";
export declare const animateExplosion: (particle: SolidParticle, options?: Partial<{
    random: NextRandom;
    radius: number;
    maxBounce: number;
    groundZ: number;
    speed: number;
    decay: number;
    dispose: () => void;
}>) => void;
