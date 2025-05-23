import type { Scene } from "@babylonjs/core";
import type { MorphRemaps } from "./ModelBuilder";
export declare const performMorph: (scene: Scene, influences: Record<string, number>, remaps: MorphRemaps) => void;
