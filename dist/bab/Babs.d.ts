import { v3 } from "./v3";
export declare const Babs: {
    createEngine: (optionsOrCanvas?: import("./createEngine").CreateEngineOptions | HTMLCanvasElement | OffscreenCanvas) => import("@babylonjs/core").Engine;
    createCanvas: ({ width, height, }: {
        width: number;
        height: number;
    }) => HTMLCanvasElement;
    renderOnce: (scene: import("@babylonjs/core").Scene) => Promise<void>;
    v3: typeof v3;
    c3: (color: string) => import("@babylonjs/core").Color3;
    c4: (color: string) => import("@babylonjs/core").Color4;
    describeMesh: (mesh: import("@babylonjs/core").AbstractMesh, search?: RegExp, depth?: number) => void;
    helloWorld: (engine?: import("@babylonjs/core").Engine) => import("@babylonjs/core").Scene;
    attachEditorControls: (camera: import("@babylonjs/core").ArcRotateCamera, options?: Partial<{
        keySensitivity: number;
        mouseSensitivity: number;
        parent: HTMLElement;
        action: () => void;
    }>) => import("@mjt-engine/animate").AnimateState[];
};
