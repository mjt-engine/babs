import { v3 } from "./v3";
export declare const Babs: {
    createEngine: (optionsOrCanvas?: import("../engine/createWebglEngine").CreateEngineOptions | HTMLCanvasElement | OffscreenCanvas) => import("@babylonjs/core").Engine;
    createCanvas: ({ width, height, }: {
        width: number;
        height: number;
    }) => HTMLCanvasElement;
    v3: typeof v3;
    c3: (color: string) => import("@babylonjs/core").Color3;
    c4: (color: string) => import("@babylonjs/core").Color4;
    helloWorld: (engine?: import("..").BabEngine) => import("@babylonjs/core").Scene;
    helloXrWorld: (engine?: import("..").BabEngine) => Promise<{
        scene: import("@babylonjs/core").Scene;
        xr: Promise<import("@babylonjs/core").WebXRDefaultExperience>;
    }>;
    attachEditorControls: (camera: import("@babylonjs/core").ArcRotateCamera, options?: Partial<{
        keySensitivity: number;
        mouseSensitivity: number;
        parent: HTMLElement;
        action: () => void;
    }>) => import("@mjt-engine/animate").AnimateState[];
};
