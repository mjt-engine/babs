import { Cameras } from "../camera/Cameras";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { Lights } from "../light/Lights";
import { Meshes } from "../mesh/Meshes";
import { Scenes } from "../scene/Scenes";
import { BabEngine } from "../type/BabEngine";
import { Wxrs } from "./Wxrs";

export const helloXrWorld = async (engine: BabEngine = createWebGlEngine()) => {
  const scene = Scenes.createScene(engine);
  // var camera = new BABYLON.FreeCamera(
  //   "camera1",
  //   new BABYLON.Vector3(0, 5, -10),
  //   scene
  // );

  const camera = Cameras.getFreeCamera(scene, "camera1", {
    position: [0, 5, -10],
    target: [0, 0, 0],
  });
  // camera.setTarget(BABYLON.Vector3.Zero());
  const canvas = engine.getRenderingCanvas();
  camera.attachControl(canvas, true);
  // var light = new BABYLON.HemisphericLight(
  //   "light1",
  //   new BABYLON.Vector3(0, 1, 0),
  //   scene
  // );
  const light = Lights.getHemisphericLight(scene, "light1", {
    direction: [0, 1, 0],
    intensity: 0.7,
  });
  // light.intensity = 0.7;
  // var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

  const sphere = Meshes.getSphere(scene, "sphere", {
    radius: 1,
    position: [0, 1, 0],
  });
  // sphere.position.y = 1;

  const env = Wxrs.createDefaultEnvironment(scene);
  // const env = scene.createDefaultEnvironment();
  if (!env?.ground) {
    throw new Error("Failed to create default environment");
  }

  const xr = Wxrs.createWebXrExperience(scene, {
    floorMeshes: [env.ground],
  });

  // const xr = await scene.createDefaultXRExperienceAsync({
  //   floorMeshes: [env.ground],
  // });
  // run the main render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  return { scene, xr };
};
