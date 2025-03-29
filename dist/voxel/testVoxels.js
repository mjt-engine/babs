"use strict";
// import { Animates } from "@mjt-engine/animate";
// import { MagicaVoxels } from "@mjt-engine/magica-voxels";
// import { Noises } from "@mjt-engine/noise";
// import { animateExplosion } from "./animateExplosion";
// import { voxDataToComplexModel } from "./voxDataToComplexModel";
// export const testVoxels = async () => {
//   // const ab = await (await fetch("voxel/5x5x5.vox")).arrayBuffer();
//   // const ab = await (await fetch("voxel/teapot.vox")).arrayBuffer();
//   // const ab = await (await fetch("voxel/castle.vox")).arrayBuffer();
//   const ab = await (await fetch("voxel/castle.vox")).arrayBuffer();
//   const parsed = MagicaVoxels.parse(ab);
//   // console.log({ parsed });
//   // console.log(JSON.stringify(parsed));
//   const canvas = document.createElement("canvas");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   document.body.appendChild(canvas);
//   // const visual = Visuals.createVisual(canvas);
//   const { scene } = visual;
//   // Visuals.setupSceneBasics(scene);
//   // Visuals.attachEditorControls(scene, {
//     // parent: visual.engine.getRenderingCanvas(),
//     parent: document.body,
//   });
//   // const merged = mergeMeshes(mesh.getChildMeshes(), {
//   //   multiMultiMaterials: true,
//   // });
//   // mesh.getChildMeshes().forEach((m) => m.setEnabled(false));
//   let mesh = voxDataToComplexModel(scene, parsed, "test");
//   // let mesh = voxDataToMergedModel(scene, parsed, "test");
//   mesh.position = v3([0, 0, -10]);
//   mesh.rotate(v3([1, 0, 0]), Math.PI);
//   // const meshes = mesh.getChildMeshes() as Mesh[];
//   // const explosion = new MeshExploder(meshes);
//   // explosion.explode(0.5);
//   // console.log({ meshes });
//   const ground = getBox(scene, "ground", {
//     width: 200,
//     height: 200,
//     depth: 0.01,
//     position: [0, 0, 4],
//     color: "darkgrey",
//   });
//   // ground.material.wireframe = true
//   let timer = 0;
//   const random = Noises.noiseStream(Date.now());
//   let boom = 10;
//   Animates.create({
//     ticksPerSecond: 60,
//     ticker: (tick) => {
//       scene.render();
//       if (timer > 100) {
//         mesh.getChildMeshes().forEach((mesh, index) =>
//           animateExplosion(mesh, {
//             random,
//             radius: 2 + boom,
//             // maxBounce: 1 + (index % 3 === 0 ? 1 : 0),
//             maxBounce: 3,
//             groundZ: ground.position.z - 2,
//             speed: 10 + 100 * random(),
//           })
//         );
//         if (mesh.getChildMeshes().filter((m) => m.isEnabled()).length === 0) {
//           mesh.dispose();
//           mesh = voxDataToComplexModel(scene, parsed, "test");
//           // mesh = voxDataToMergedModel(scene, parsed, "test");
//           mesh.position = v3([0, 0, -10]);
//           mesh.rotate(v3([1, 0, 0]), Math.PI);
//           timer = 0;
//           boom = random() * 100;
//         }
//       } else {
//         // mesh.rotate(v3([0, 0, 1]), (Math.PI * tick.deltaMs) / 1000);
//       }
//       timer++;
//       // merged.rotate(v3([1, 1, 1]), (Math.PI * tick.deltaMs) / 1000);
//     },
//   });
//   return scene;
// };
//# sourceMappingURL=testVoxels.js.map