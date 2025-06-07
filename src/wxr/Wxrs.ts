import { createWebXrSessionManager } from "./createWebXrSessionManager";
import { helloXrWorld } from "./hellowXrWorld";
import { createWebXrExperience } from "./createWebXrExperience";
import { createDefaultEnvironment } from "./createDefaultHelper";
import {
  EnvironmentHelper,
  WebXRDefaultExperienceOptions,
} from "@babylonjs/core";

export type BabEnvironmentHelper = EnvironmentHelper;

export type BabWebXRDefaultExperienceOptions = WebXRDefaultExperienceOptions;
export const Wxrs = {
  createWebXrSessionManager,
  helloXrWorld,
  createDefaultEnvironment,
  createWebXrExperience,
};
