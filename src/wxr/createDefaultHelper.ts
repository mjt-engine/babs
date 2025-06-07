import { Scene as BabScene } from "@babylonjs/core";
import { BabEnvironmentHelper } from "./WxrsTypes";

export const createDefaultEnvironment = (
  scene: BabScene
): BabEnvironmentHelper => {
  const env = scene.createDefaultEnvironment();
  if (!env) {
    throw new Error("Failed to create default environment");
  }
  return env;
};
