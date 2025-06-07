import type { Vec3 } from "@mjt-engine/math";
import { attachArcRotateCameraControls } from "./attachArcRotateCameraControls";
import { attachUniversalCameraControls } from "./attachUniversalCameraControls";
import { createTopDownCamera } from "./createTopDownCamera";
import { getArcRotateCamera } from "./getArcRotateCamera";
import { getCamera } from "./getCamera";
import { getUniversalCamera } from "./getUniversalCamera";
import { updateCamera } from "./updateCamera";

import { Camera, WebXRSessionManager } from "@babylonjs/core";
import { createDebugCamera } from "./createDebugCamera";
import { getFreeCamera } from "./getFreeCamera";
import { getWebXrCamera } from "./getWebXrCamera";

export const CAMERA_MODES = {
  orthographic: Camera.ORTHOGRAPHIC_CAMERA,
  perspective: Camera.PERSPECTIVE_CAMERA,
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
export type ArcRotateCameraOptions = Partial<
  CameraOptions & {
    alpha: number;
    beta: number;
    radius: number;
  }
>;

export type UniversalCameraOptions = Partial<
  CameraOptions & {
    rotation: Vec3;
  }
>;

export type FreeCameraOptions = Partial<CameraOptions>;

export type BabXrSession = XRSession;
export type BabWebXRSessionManager = WebXRSessionManager;
export type WebXrCameraOptions = Partial<CameraOptions>;

export type AllCameraOptions = ArcRotateCameraOptions & UniversalCameraOptions;

export const Cameras = {
  getArcRotateCamera,
  getCamera,
  updateCamera,
  getUniversalCamera,
  getFreeCamera,
  getWebXrCamera,
  attachArcRotateCameraControls,
  attachUniversalCameraControls,
  createTopDownCamera,
  createDebugCamera,
};
