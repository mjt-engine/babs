import { Scene } from "@babylonjs/core";
import { BabEngine } from "../bab/BabEngine";

export const createScene = (engine: BabEngine) => {
  return new Scene(engine);
};
