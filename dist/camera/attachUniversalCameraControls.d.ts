import type { UniversalCamera } from "@babylonjs/core";
export declare const attachUniversalCameraControls: (camera: UniversalCamera, options?: Partial<{
    keySensitivity: number;
    mouseSensitivity: number;
    parent: HTMLElement;
}>) => void;
export type HasLayerPosition = {
    layerX: number;
    layerY: number;
};
