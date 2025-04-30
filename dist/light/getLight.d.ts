import type { Light } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const getLight: <T extends Light>(scene: Scene, name: string, producer: () => T) => T;
