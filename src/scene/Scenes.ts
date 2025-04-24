import type { Engine } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
import { toggleInspector } from "./toggleInspector";

export const createScene = (engine: Engine) => {
  return new Scene(engine);
};

export const Scenes = {
  createScene,
  toggleInspector,
};
