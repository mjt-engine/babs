import { WebGPUEngine, Engine } from "@babylonjs/core";
export type { Engine as BabWebGlEngine } from "@babylonjs/core";
export type { WebGPUEngine as BabWebGpuEngine } from "@babylonjs/core";
export type BabEngine = WebGPUEngine | Engine;
