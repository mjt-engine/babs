import { Scene as BabScene } from "@babylonjs/core";
import { BabWebXrDefaultExperience, BabWebXRDefaultExperienceOptions } from "./WxrsTypes";
export declare const createWebXrExperience: (scene: BabScene, options?: BabWebXRDefaultExperienceOptions) => Promise<BabWebXrDefaultExperience>;
