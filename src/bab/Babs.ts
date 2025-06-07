import { attachArcRotateCameraControls } from "../camera/attachArcRotateCameraControls";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { helloXrWorld } from "../wxr/hellowXrWorld";
import { c3 } from "./c3";
import { c4 } from "./c4";
import { createCanvas } from "./createCanvas";
import { helloWorld } from "./helloWorld";
import { v3 } from "./v3";

export const Babs = {
  createEngine: createWebGlEngine,
  createCanvas,
  v3,
  c3,
  c4,
  helloWorld,
  helloXrWorld,
  attachEditorControls: attachArcRotateCameraControls,
};
