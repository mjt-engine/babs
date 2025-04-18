import type { Scene } from "@babylonjs/core/scene";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
export declare const createTopDownCamera: (scene: Scene, name: string, { unitsTall, unitsWide, height, disposeActive, }?: Partial<{
    height: number;
    disposeActive: boolean;
    unitsTall: number;
    unitsWide: number;
}>) => UniversalCamera;
