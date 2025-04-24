import type { Vec3 } from "@mjt-engine/math";
import { Camera } from "@babylonjs/core";
export declare const CAMERA_MODES: {
    orthographic: number;
    perspective: number;
};
export type CameraModeMap = typeof CAMERA_MODES;
export type CameraOptions = Partial<{
    mode: keyof CameraModeMap;
    position: Vec3;
    minZ: number;
    maxZ: number;
    target: Vec3;
    orthoTop: number;
    orthoBottom: number;
    orthoLeft: number;
    orthoRight: number;
}>;
export type ArcRotateCameraOptions = Partial<CameraOptions & {
    alpha: number;
    beta: number;
    radius: number;
}>;
export type UniversalCameraOptions = Partial<CameraOptions & {
    rotation: Vec3;
}>;
export type AllCameraOptions = ArcRotateCameraOptions & UniversalCameraOptions;
export declare const Cameras: {
    getArcRotateCamera: (scene: import("@babylonjs/core").Scene, name: string, options?: ArcRotateCameraOptions) => import("@babylonjs/core").ArcRotateCamera;
    getCamera: <T extends Camera>(scene: import("@babylonjs/core").Scene, name: string, producer: () => T) => T;
    updateCamera: (camera: Camera, options: AllCameraOptions) => void;
    getUniversalCamera: (scene: import("@babylonjs/core").Scene, name: string, options?: UniversalCameraOptions) => import("@babylonjs/core").UniversalCamera;
    attachArcRotateCameraControls: (camera: import("@babylonjs/core").ArcRotateCamera, options?: Partial<{
        keySensitivity: number;
        mouseSensitivity: number;
        parent: HTMLElement;
        action: () => void;
    }>) => import("@mjt-engine/animate").AnimateState[];
    attachUniversalCameraControls: (camera: import("@babylonjs/core").UniversalCamera, options?: Partial<{
        keySensitivity: number;
        mouseSensitivity: number;
        parent: HTMLElement;
    }>) => void;
    createTopDownCamera: (scene: import("@babylonjs/core").Scene, name: string, { unitsTall, unitsWide, height, disposeActive, }?: Partial<{
        height: number;
        disposeActive: boolean;
        unitsTall: number;
        unitsWide: number;
    }>) => import("@babylonjs/core").UniversalCamera;
    createDebugCamera: (scene: import("@babylonjs/core").Scene, name: string) => void;
};
