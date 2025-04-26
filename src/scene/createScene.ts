import { Scene } from "@babylonjs/core";
import { BabEngine } from "../type/BabEngine";

export const createScene = (engine: BabEngine) => {
  return new Scene(engine);
};
