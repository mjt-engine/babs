import * as BABYLON from "@babylonjs/core";
import { BabEngine } from "../type/BabEngine";
import { Cameras } from "../camera/Cameras";
import { Lights } from "../light/Lights";
import { Textures } from "../texture/Textures";
import { Meshes } from "../mesh/Meshes";
import { Particles } from "../particle/Particles";
import { Materials } from "../material/Materials";
import { Noises } from "@mjt-engine/noise";
import { Colors } from "@mjt-engine/color";

export const spsDebug2 = ({
  engine,
  canvas,
}: {
  engine: BabEngine;
  canvas: HTMLCanvasElement;
}) => {
  const scene = new BABYLON.Scene(engine);
  console.log(scene);

  const camera = Cameras.getArcRotateCamera(scene, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0],
  });
  camera.attachControl(canvas, true);
  const light = Lights.getHemisphericLight(scene, "light", {
    direction: [0, 1, -1],
  });
  const tex = Textures.getPathTexture(scene, "tex", {
    src: "/images/test.jpg",
  });
  const mat = Materials.getMaterial(scene, "mat", {
    opacityTexture: tex.name,
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),

    // alpha: 0.99,
  });
  // mat.needAlphaBlending = () => true;
  // mat.alphaMode = BABYLON.Constants.ALPHA_COMBINE;
  // mat.
  // const box1 = BABYLON.MeshBuilder.CreateBox("box1", {
  //   ma: mat.name,
  // });
  // const SPS = new BABYLON.SolidParticleSystem("SPS", scene);
  const box1 = Meshes.getBox(
    scene,
    "box1"
    //  { material: mat.name }
  );
  // const poly = BABYLON.MeshBuilder.CreatePolyhedron("p", { type: 2 });
  // box1.material = mat1;
  // scene.addMesh(poly)

  const sps = Particles.Sps(scene, "sps", {
    material: mat.name,
    updatable: true,
    // enableDepthSort: true,

    onMeshBuild: (mesh) => {
      mesh.useVertexColors = true;
      mesh.hasVertexAlpha = true;
      // mesh.material = mat;
    },
  });
  sps.addMesh(box1, 10_000); // 20 spheres
  sps.updateParticlesByName("box1", (particle, i) => {
    particle.position.x = BABYLON.Scalar.RandomRange(-20, 20);
    particle.position.y = BABYLON.Scalar.RandomRange(-20, 20);
    particle.position.z = BABYLON.Scalar.RandomRange(-20, 20);
  });

  // SPS.addShape(box1, 10000); // 20 spheres

  // const mesh = SPS.buildMesh(); // finally builds and displays the SPS mesh

  // // initiate particles function
  // SPS.initParticles = () => {
  //   for (let p = 0; p < SPS.nbParticles; p++) {
  //     const particle = SPS.particles[p];
  //     particle.position.x = BABYLON.Scalar.RandomRange(-20, 20);
  //     particle.position.y = BABYLON.Scalar.RandomRange(-20, 20);
  //     particle.position.z = BABYLON.Scalar.RandomRange(-20, 20);
  //   }
  // };

  // //Update SPS mesh
  // SPS.initParticles();
  // SPS.setParticles();
  // sps.getInstance().mesh.useVertexColors = true;
  const update = () => {
    const s = Math.sin(Date.now() * 0.005);

    const n = Noises.noiseStream(0);
    // const n = () => 0.5;
    sps.updateParticlesByName("box1", (p, i) => {
      p.color = new BABYLON.Color4(n(), n(), n(), 0.5);
      if (Math.random() > 0.5) {
        p.rotation.x = n() * s;
      } else {
        p.rotation.y = n() * s;
      }
    });
    sps.update();

    // SPS.particles.forEach((p, i) => {
    //   // console.log(p.name)
    //   if (i > 20) {
    //     p.rotation.x = a;
    //     // mat1.alpha = a;
    //     // mat1.diffuseTexture = fire;
    //   } else {
    //     p.rotation.y = a;
    //   }
    // });
    // SPS.setParticles();
  };

  return { scene, update };
};
