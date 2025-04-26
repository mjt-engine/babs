import { WebGPUEngine, WebGPUEngineOptions } from "@babylonjs/core";

export const createWebGpuEngine = ({
  canvas,
  ...rest
}: { canvas: HTMLCanvasElement | OffscreenCanvas } & WebGPUEngineOptions) => {
  const engine = new WebGPUEngine(canvas, {
    powerPreference: "high-performance",
    ...rest,
  });
  engine.hideLoadingUI();
  return engine;
};
