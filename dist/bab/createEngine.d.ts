import type { EngineOptions } from "@babylonjs/core/Engines/thinEngine";
import { Engine } from "@babylonjs/core";
export declare const createEngine: (options?: EngineOptions & {
    antialias?: boolean;
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement | OffscreenCanvas;
}) => Engine;
