import { Engine } from "@babylonjs/core";
import type { EngineOptions } from "@babylonjs/core/Engines/thinEngine";
import { createCanvas } from "../bab/createCanvas";

export type CreateEngineOptions = EngineOptions & {
  antialias?: boolean;
  width?: number;
  height?: number;
  canvas?: HTMLCanvasElement | OffscreenCanvas;
};
export const createWebGlEngine = (
  optionsOrCanvas?: CreateEngineOptions | HTMLCanvasElement | OffscreenCanvas
) => {
  const options: CreateEngineOptions = !(
    optionsOrCanvas instanceof HTMLCanvasElement ||
    optionsOrCanvas instanceof OffscreenCanvas
  )
    ? optionsOrCanvas ?? {}
    : {};
  const canvas =
    optionsOrCanvas instanceof HTMLCanvasElement ||
    optionsOrCanvas instanceof OffscreenCanvas
      ? optionsOrCanvas
      : createCanvas({
          width: optionsOrCanvas?.width ?? 320,
          height: optionsOrCanvas?.height ?? 320,
        });
  const { antialias, xrCompatible = true } = options;

  // const prop
  const engine = new Engine(canvas, antialias, {
    powerPreference: "high-performance",
    xrCompatible,
    ...options,
  });
  // engine.loadingScreen = undefined!;
  engine.hideLoadingUI();
  return engine;
};
