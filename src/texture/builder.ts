import { Camera } from "@babylonjs/core/Cameras/camera";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { createEngine } from "../bab/createEngine";
import { renderOnce } from "../bab/renderOnce";
import { v3 } from "../bab/v3";
import { timeP } from "../util/Timers";
import type { TextureLayer } from "./TextureLayer";
import { copyToCanvas } from "./copyToCanvas";
import { imageLayersToScene } from "./imageLayersToScene";

export const builder = ({ size } = { size: 4096 }): TextureBuilder => {
  const engine = createEngine({ width: size, height: size });
  const canvas = engine.getRenderingCanvas();
  const STATE = {
    layers: [] as TextureLayer[],
  };
  const b: TextureBuilder = {
    addLayer: (layer) => {
      STATE.layers.push({ size, ...layer });
      return b;
    },
    render: async () => {
      return timeP(async () => {
        const scene = await imageLayersToScene(STATE.layers, engine);
        const camera = new UniversalCamera("camera1", v3(0, 0, -1000), scene);
        camera.setTarget(v3());
        camera.rotation = v3(0, 0, Math.PI);
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera.minZ = 0;
        camera.maxZ = 100000;

        await renderOnce(scene);
        b.clear();
        if (!canvas) {
          throw new Error("No canvas found", { cause: engine });
        }
        return copyToCanvas(canvas);
      }, "Texture render");
    },
    clear: () => {
      STATE.layers.forEach((layer) => {
        if (layer?._cached) {
          return;
        }
        layer?._texture?.dispose();
        layer?._mesh?.dispose();
        layer?._material?.dispose();
      });
      STATE.layers.length = 0;
      return b;
    },
  };

  return b;
};

export type TextureBuilder = {
  addLayer: (layer: TextureLayer) => TextureBuilder;
  render: () => Promise<HTMLCanvasElement | OffscreenCanvas>;
  clear: () => TextureBuilder;
};
