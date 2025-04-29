import { ArcRotateCamera } from "@babylonjs/core";
import type { Camera } from "@babylonjs/core";
import { TargetCamera } from "@babylonjs/core";
import { iff } from "@mjt-engine/object";
import { v3 } from "../bab/v3";
import type { AllCameraOptions } from "./Cameras";
import { CAMERA_MODES } from "./Cameras";

export const updateCamera = (camera: Camera, options: AllCameraOptions) => {
  const {
    alpha,
    beta,
    radius,
    target,
    position,
    rotation,
    minZ,
    maxZ,
    mode,
    orthoTop,
    orthoBottom,
    orthoLeft,
    orthoRight,
  } = options;
  iff(position, (value) => {
    camera.position = v3(value);
  });
  iff(minZ, (value) => {
    camera.minZ = value;
  });
  iff(maxZ, (value) => {
    camera.maxZ = value;
  });

  iff(mode, (value) => {
    camera.mode = CAMERA_MODES[value];
  });

  iff(mode, (value) => {
    camera.mode = CAMERA_MODES[value];
  });

  iff(orthoTop, (value) => {
    camera.orthoTop = value;
  });

  iff(orthoBottom, (value) => {
    camera.orthoBottom = value;
  });

  iff(orthoLeft, (value) => {
    camera.orthoLeft = value;
  });

  iff(orthoRight, (value) => {
    camera.orthoRight = value;
  });

  if (camera instanceof TargetCamera) {
    iff(rotation, (value) => {
      camera.rotation = v3(value);
    });
    iff(target, (value) => {
      camera.target = v3(value);
    });
  }

  if (camera instanceof ArcRotateCamera) {
    iff(alpha, (value) => {
      camera.alpha = value;
    });
    iff(beta, (value) => {
      camera.beta = value;
    });
    iff(radius, (value) => {
      camera.radius = value;
    });
  }
};
