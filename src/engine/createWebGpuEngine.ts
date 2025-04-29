import { WebGPUEngine, WebGPUEngineOptions } from "@babylonjs/core";

export const createWebGpuEngine = async ({
  canvas,
  ...rest
}: { canvas: HTMLCanvasElement | OffscreenCanvas } & WebGPUEngineOptions) => {
  const engine = new WebGPUEngine(canvas, {
    // powerPreference: "high-performance",
    ...rest,
  });
  engine.hideLoadingUI();
  await engine.initAsync();
  return engine;
};
