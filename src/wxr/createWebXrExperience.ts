import { Scene as BabScene } from "@babylonjs/core";
import {
  BabWebXrDefaultExperience,
  BabWebXRDefaultExperienceOptions,
} from "./WxrsTypes";

export const createWebXrExperience = async (
  scene: BabScene,
  options: BabWebXRDefaultExperienceOptions = {}
): Promise<BabWebXrDefaultExperience> => {
  return scene.createDefaultXRExperienceAsync(options);
};
