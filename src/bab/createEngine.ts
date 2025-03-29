import { Engine } from "@babylonjs/core/Engines/engine";
import type { EngineOptions } from "@babylonjs/core/Engines/thinEngine";
import { createCanvas } from "./createCanvas";

export const createEngine = (
  options: EngineOptions & {
    antialias?: boolean;
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement | OffscreenCanvas;
  } = {}
) => {
  const {
    width = 320,
    height = 320,
    antialias,
    canvas = createCanvas({ width, height }),
  } = options;
  const engine = new Engine(canvas, antialias, {
    powerPreference: "high-performance",
    ...options,
  });
  // engine.loadingScreen = undefined!;
  engine.hideLoadingUI();
  return engine;
};
