import { Mesh, type Scene, SolidParticleSystem } from "@babylonjs/core";
import { getParticleSystem } from "./getParticleSystem";
import { BabScene } from "../type/BabScene";
import { BabSolidParticleSystem } from "../type/BabParticleSystem";
import { Materials } from "../material/Materials";
import { Meshes } from "../mesh/Meshes";

export const getSolidParticleSystem = (
  scene: Scene,
  name: string,
  options: ConstructorParameters<typeof SolidParticleSystem>[2]
): SolidParticleSystem => {
  return getParticleSystem(scene, name, () => {
    return new SolidParticleSystem(name, scene, {
      ...options,
    });
  });
};

export const buildSpsFromSchadowScene = ({
  sps,
  shadowScene,
  liveScene,
}: {
  sps: BabSolidParticleSystem;
  shadowScene: BabScene;
  liveScene: BabScene;
}) => {
  // shadowScene.meshes.forEach((shadowMesh) => {
  //   // const cloneMesh = cloneMeshBasic(shadowMesh as Mesh, liveScene);
  //   // console.log("mesh", cloneMesh);
  // });
  // const testMaterial = Materials.getMaterial(liveScene, "test");
  // console.log("testMaterial", testMaterial);

  const box = Meshes.getPlane(liveScene, "FOO", {
    material: "test",
    width: 1,
    height: 1,
    // depth: 1,
    color: "red",
  });
  box.visibility = 0;
  sps.addShape(box, 1);
  sps.particles.forEach((particle, i) => {
    const mesh = shadowScene.meshes[10];
    mesh.visibility = 0;
    particle.position.copyFrom(mesh.position);
    particle.rotation.copyFrom(mesh.rotation);
    particle.scaling.copyFrom(mesh.scaling);

    // (particle as unknown as Mesh).material = mesh.material;
    // (particle as unknown as Mesh).name = mesh.name;
  });

  const mesh = sps.buildMesh();
  // mesh.material = testMaterial;
  // mesh.material!.wireframe = true;
  sps.setParticles();
};

function cloneMeshBasic(sourceMesh: Mesh, targetScene: Scene): Mesh {
  // Create a new empty mesh in the target scene
  const clonedMesh = new Mesh(sourceMesh.name + "_clone", targetScene);

  // Clone the geometry (vertex/index buffers)
  if (sourceMesh.geometry) {
    // Share geometry (you can also clone it if you want an independent copy)
    sourceMesh.geometry.applyToMesh(clonedMesh);
  }

  // Copy transform data
  clonedMesh.position.copyFrom(sourceMesh.position);
  clonedMesh.rotation.copyFrom(sourceMesh.rotation);
  clonedMesh.scaling.copyFrom(sourceMesh.scaling);

  // Copy pivot (if any)
  if (sourceMesh.getPivotMatrix()) {
    clonedMesh.setPivotMatrix(sourceMesh.getPivotMatrix().clone());
  }
  const mat = targetScene.materials.find(
    (m) => m.name === sourceMesh.material?.name
  );
  console.log("mat", mat);

  return clonedMesh;
}
