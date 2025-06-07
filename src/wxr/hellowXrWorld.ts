import { Cameras } from "../camera/Cameras";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { Lights } from "../light/Lights";
import { Meshes } from "../mesh/Meshes";
import { Scenes } from "../scene/Scenes";
import { BabEngine } from "../type/BabEngine";
import { createDefaultEnvironment } from "./createDefaultHelper";
import { createWebXrExperience } from "./createWebXrExperience";

export const helloXrWorld = async (engine: BabEngine = createWebGlEngine()) => {
  const scene = Scenes.createScene(engine);
  const camera = Cameras.getFreeCamera(scene, "camera1", {
    position: [0, 5, -10],
    target: [0, 0, 0],
  });
  const canvas = engine.getRenderingCanvas();
  camera.attachControl(canvas, true);
  const light = Lights.getHemisphericLight(scene, "light1", {
    direction: [0, 1, 0],
    intensity: 0.7,
  });

  const sphere = Meshes.getSphere(scene, "sphere", {
    radius: 1,
    position: [0, 1, 0],
  });

  const env = createDefaultEnvironment(scene);
  if (!env?.ground) {
    throw new Error("Failed to create default environment");
  }

  const xr = createWebXrExperience(scene, {
    floorMeshes: [env.ground],
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  return { scene, xr };
};
