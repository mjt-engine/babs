import { Scene } from "@babylonjs/core";
import { Cameras } from "../camera/Cameras";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { Lights } from "../light/Lights";
import { Meshes } from "../mesh/Meshes";
import { BabEngine } from "../type/BabEngine";

export const helloWorld = (engine: BabEngine = createWebGlEngine()) => {
  const scene = new Scene(engine);
  const canvas = engine.getRenderingCanvas();

  const camera = Cameras.getArcRotateCamera(scene, "Camera", {});
  camera.attachControl(canvas, true);
  Lights.getHemisphericLight(scene, "light1", {
    direction: [1, 1, 1],
  });
  Meshes.getSphere(scene, "sphere", {
    radius: 0.5,
  });
  // hide/show the Inspector
  const STATE = { debug: false };
  canvas!.onkeyup = (ev) => {
    // ctrl+I
    if (ev.ctrlKey && ev.keyCode === 73) {
      STATE.debug = !STATE.debug;
      if (STATE.debug) {
        scene.debugLayer.hide();
      } else {
        console.log("SHOW!");
        scene.debugLayer.show();
      }
    }
  };

  // run the main render loop
  engine.runRenderLoop(() => {
    scene.render();
  });
  return scene;
};
