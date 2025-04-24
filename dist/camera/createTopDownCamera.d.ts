import type { Scene } from "@babylonjs/core";
import { UniversalCamera } from "@babylonjs/core";
export declare const createTopDownCamera: (scene: Scene, name: string, { unitsTall, unitsWide, height, disposeActive, }?: Partial<{
    height: number;
    disposeActive: boolean;
    unitsTall: number;
    unitsWide: number;
}>) => UniversalCamera;
