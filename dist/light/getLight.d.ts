import type { Light } from "@babylonjs/core/Lights/light";
import type { Scene } from "@babylonjs/core/scene";
export declare const getLight: <T extends Light>(scene: Scene, name: string, producer: () => T) => T;
