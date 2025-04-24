import type { Vec3 } from "@mjt-engine/math";
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
};
