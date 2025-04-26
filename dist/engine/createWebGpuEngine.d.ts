import { WebGPUEngine, WebGPUEngineOptions } from "@babylonjs/core";
export declare const createWebGpuEngine: ({ canvas, ...rest }: {
    canvas: HTMLCanvasElement | OffscreenCanvas;
} & WebGPUEngineOptions) => WebGPUEngine;
