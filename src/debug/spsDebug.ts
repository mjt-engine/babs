import * as BABYLON from "@babylonjs/core";
import { BabEngine } from "../type/BabEngine";

export const spsDebug = ({
  engine,
  canvas,
}: {
  engine: BabEngine;
  canvas: HTMLCanvasElement;
}) => {
  const scene = new BABYLON.Scene(engine);
  console.log(scene);

  const camera = new BABYLON.ArcRotateCamera(
    "ArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 2.2,
    50,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, -1),
    scene
  );
  const mat1 = new BABYLON.StandardMaterial("mat");
  mat1.diffuseTexture = new BABYLON.Texture("textures/earth.jpg");
  const mat2 = new BABYLON.StandardMaterial("mat");
  const fire = new BABYLON.Texture("textures/fire.jpg");
  mat2.diffuseTexture = fire;
  const SPS = new BABYLON.SolidParticleSystem("SPS", scene, {
    useModelMaterial: true,
  });
  const box1 = BABYLON.MeshBuilder.CreateBox("FOO");
  // const poly = BABYLON.MeshBuilder.CreatePolyhedron("p", { type: 2 });
  box1.material = mat1;
  // scene.addMesh(poly)
  SPS.addShape(box1, 10_000); // 20 spheres
  // SPS.addShape(box2, 20); // 20 spheres
  // SPS.addShape(poly, 120); // 120 polyhedrons
  // SPS.addShape(sphere, 80); // 80 other spheres
  // sphere.dispose(); //dispose of original model sphere
  // poly.dispose(); //dispose of original model poly

  const mesh = SPS.buildMesh(); // finally builds and displays the SPS mesh

  // initiate particles function
  SPS.initParticles = () => {
    for (let p = 0; p < SPS.nbParticles; p++) {
      const particle = SPS.particles[p];
      particle.position.x = BABYLON.Scalar.RandomRange(-20, 20);
      particle.position.y = BABYLON.Scalar.RandomRange(-20, 20);
      particle.position.z = BABYLON.Scalar.RandomRange(-20, 20);
    }
  };

  //Update SPS mesh
  SPS.initParticles();
  SPS.setParticles();
  const update = () => {
    const a = Math.sin(Date.now() * 0.005);

    // mat.alpha=a
    // box1.rotation.x = a
    // box.rotate(new BABYLON. Vector3(0,1,0), new BABYLON.Vector3(0.1,0.1, 0.1), BABYLON.Space.WORLD);
    // box.useVertexColors
    // console.log("render");
    SPS.particles.forEach((p, i) => {
      // console.log(p.name)
      if (i > 20) {
        p.rotation.x = a;
        mat1.alpha = a;
        mat1.diffuseTexture = fire;
      } else {
        p.rotation.y = a;
      }
    });
    SPS.setParticles();
  };

  // mesh.material = mat;
  // scene.registerBeforeRender(() => {});

  return { scene, update };
};


