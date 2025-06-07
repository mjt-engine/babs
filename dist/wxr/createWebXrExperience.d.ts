import { Scene as BabScene } from "@babylonjs/core";
import { BabWebXRDefaultExperienceOptions } from "./WxrsTypes";
export declare const createWebXrExperience: (scene: BabScene, options?: BabWebXRDefaultExperienceOptions) => Promise<import("@babylonjs/core").WebXRDefaultExperience>;
