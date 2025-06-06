import * as BABYLON from "@babylonjs/core";
import { BabEngine } from "../type/BabEngine";
export declare const helloVrWorld: (engine?: BabEngine) => Promise<{
    scene: BABYLON.Scene;
    xr: BABYLON.WebXRDefaultExperience;
}>;
