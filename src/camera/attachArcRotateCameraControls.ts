// import type { ArcRotateCamera } from "babylonjs";
// import { Scene } from "babylonjs";
import type { AnimateState } from "@mjt-engine/animate";
import { Inputs } from "@mjt-engine/input";
import type { Point2 } from "@mjt-engine/math";
import { Maths, toVec2 } from "@mjt-engine/math";
import { updateArcRotateCameraPosition } from "../mesh/updateArcRotateCameraPosition";
import { v3 } from "../bab/v3";
import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

export const attachArcRotateCameraControls = (
  camera: ArcRotateCamera,
  options: Partial<{
    keySensitivity: number;
    mouseSensitivity: number;
    parent: HTMLElement;
    action: () => void;
  }> = {}
): AnimateState[] => {
  const {
    keySensitivity = 0.5,
    mouseSensitivity = 0.05,
    parent = document.body,
    action = () => {},
  } = options;

  const defaultAlpha = camera.alpha;
  const defaultBeta = camera.beta;
  const defaultRadius = camera.radius;
  const defaultTarget = v3(camera.target);
  const update = (x = 0, y = 0, z = 0) => {
    updateArcRotateCameraPosition(camera, [x, y, z]);
    action();
  };

  const keyAnim = Inputs.listenToKey(
    {
      // Y up
      w: () => {
        update(-keySensitivity / 2, keySensitivity / 2, 0);
      },
      "shift+w": () => {
        camera.radius -= keySensitivity;
      },

      // X left
      a: () => {
        update(-keySensitivity / 2, -keySensitivity / 2, 0);
      },
      "shift+s": () => {
        camera.radius += keySensitivity;
      },

      // Y down
      s: () => {
        update(keySensitivity / 2, -keySensitivity / 2, 0);
      },

      // X right
      d: () => {
        update(keySensitivity / 2, keySensitivity / 2, 0);
      },
      v: () => {
        camera.beta = camera.beta + keySensitivity / 8;
        action();
      },
      z: () => {
        camera.beta = camera.beta - keySensitivity / 8;
        action();
      },
      c: () => {
        camera.alpha = defaultAlpha;
        camera.beta = defaultBeta;
        camera.radius = defaultRadius;
        action();
        // camera.target = defaultTarget;
      },
      "shift+d": () => {
        camera.alpha = camera.alpha + keySensitivity / 8;

        action();
      },
      "shift+a": () => {
        camera.alpha = camera.alpha - keySensitivity / 8;

        action();
      },
    },
    {
      autoUp: false,
      parent,
    }
  );
  const MOUSE_STATE = {
    lastPosition: undefined as Point2 | undefined,
  };
  parent.addEventListener("pointerdown", (event) => {
    if (event.buttons === 4) {
      MOUSE_STATE.lastPosition = event;
    }
  });
  parent.addEventListener("pointermove", (event) => {
    if (event.buttons !== 4) {
      return;
    }
    const { lastPosition: auxDownLast = event } = MOUSE_STATE;
    MOUSE_STATE.lastPosition = event;
    const diff = Maths.subtract2(auxDownLast, event);
    const [x, y] = toVec2(diff);

    if (event.buttons === 4 && event.shiftKey) {
      camera.beta = camera.beta + y * mouseSensitivity;
      return;
    }

    if (event.buttons === 4) {
      update(y * mouseSensitivity, -y * mouseSensitivity, 0);
      update(x * mouseSensitivity, x * mouseSensitivity, 0);
    }
  });

  // zoom
  const mouseAnim = Inputs.listenToMouse(
    {
      wheel: (event) => {
        if (event instanceof WheelEvent) {
          const delta = event.deltaY * mouseSensitivity;
          camera.radius += delta;
          action();
        }
      },
    },
    {
      parent,
    }
  );
  return [keyAnim, mouseAnim];
};
