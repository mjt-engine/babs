import {
  Scene as BabScene
} from "@babylonjs/core";
import { BabWebXRDefaultExperienceOptions } from "./Wxrs";

export const createWebXrExperience = async (
  scene: BabScene,
  options: BabWebXRDefaultExperienceOptions = {}
) => {
  return scene.createDefaultXRExperienceAsync(options);
};
