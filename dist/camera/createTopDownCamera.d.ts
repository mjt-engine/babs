import type { Scene } from "@babylonjs/core";
import { BabUniversalCamera } from "../type/BabCamera";
export declare const createTopDownCamera: (scene: Scene, name: string, { unitsTall, unitsWide, cameraLevel, disposeActive, }?: Partial<{
    cameraLevel: number;
    disposeActive: boolean;
    unitsTall: number;
    unitsWide: number;
}>) => BabUniversalCamera;
