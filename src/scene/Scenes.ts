import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { toggleInspector } from "./toggleInspector";

export const createScene = (engine: Engine) => {
  return new Scene(engine);
};

export const Scenes = {
  createScene,
  toggleInspector,
};
