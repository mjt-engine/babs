import { createWebGlEngine } from "./createWebglEngine";
import { createWebGpuEngine } from "./createWebGpuEngine";
import { isWebGpuCapable } from "./isWebGpuCapable";

export const Engines = {
  createWebGlEngine,
  createWebGpuEngine,
  isWebGpuCapable,
};
