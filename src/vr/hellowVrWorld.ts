import * as BABYLON from "@babylonjs/core";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { BabEngine } from "../type/BabEngine";

export const helloVrWorld = async (engine: BabEngine = createWebGlEngine()) => {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  const canvas = engine.getRenderingCanvas();
  camera.attachControl(canvas, true);
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
  var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
  sphere.position.y = 1;

  const env = scene.createDefaultEnvironment();
  if (!env?.ground) {
    throw new Error("Failed to create default environment");
  }

  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
  });
  // run the main render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  return { scene, xr };
};
