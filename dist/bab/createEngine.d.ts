import { Engine } from "@babylonjs/core";
import type { EngineOptions } from "@babylonjs/core/Engines/thinEngine";
export type CreateEngineOptions = EngineOptions & {
    antialias?: boolean;
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement | OffscreenCanvas;
};
export declare const createEngine: (optionsOrCanvas?: CreateEngineOptions | HTMLCanvasElement | OffscreenCanvas) => Engine;
