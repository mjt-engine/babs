export declare const Engines: {
    createWebGlEngine: (optionsOrCanvas?: import("./createWebglEngine").CreateEngineOptions | HTMLCanvasElement | OffscreenCanvas) => import("@babylonjs/core").Engine;
    createWebGpuEngine: ({ canvas, ...rest }: {
        canvas: HTMLCanvasElement | OffscreenCanvas;
    } & import("@babylonjs/core").WebGPUEngineOptions) => import("@babylonjs/core").WebGPUEngine;
    isWebGpuCapable: () => Promise<boolean>;
};
