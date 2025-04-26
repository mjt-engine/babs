import { WebGPUEngine } from "@babylonjs/core";


export const isWebGpuCapable = () => {
  return WebGPUEngine.IsSupportedAsync;
};
