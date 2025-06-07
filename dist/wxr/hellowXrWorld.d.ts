import { BabEngine } from "../type/BabEngine";
export declare const helloXrWorld: (engine?: BabEngine) => Promise<{
    scene: import("@babylonjs/core").Scene;
    xr: Promise<import("@babylonjs/core").WebXRDefaultExperience>;
}>;
