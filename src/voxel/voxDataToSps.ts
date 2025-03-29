import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { SolidParticleSystem } from "@babylonjs/core/Particles/solidParticleSystem";
import type { Scene } from "@babylonjs/core/scene";
import { Colors } from "@mjt-engine/color";
import type { VoxData } from "@mjt-engine/magica-voxels";
import { c3 } from "../bab/c3";
import { c4 } from "../bab/c4";
import { v3 } from "../bab/v3";
import { getMaterial } from "../material/getMaterial";
import { voxDataToCorrectedPoints } from "./voxDataToCorrectedPoints";

export const voxDataToSps = (scene: Scene, voxData: VoxData, name: string) => {
  const { XYZI, RGBA, SIZE } = voxData;

  const colors = RGBA.map((rgba) => {
    const { r, g, b, a } = rgba;
    return Colors.builder({ color: [r, g, b, a], model: "rgba" }).toString();
  });

  const sps = new SolidParticleSystem(name, scene);
  const scale = 1 / SIZE.z;
  const box = MeshBuilder.CreateBox("temp-box", {
    width: scale,
    height: scale,
    depth: scale,
  });
  sps.addShape(box, XYZI.length);
  sps.buildMesh();
  box.dispose();
  voxDataToCorrectedPoints(voxData).forEach((pc, index) => {
    const [point, colorIndex] = pc;
    const particle = sps.particles[index];
    particle.position = v3(point);

    const color = colors[colorIndex];
    particle.color = c4(color);
  });
  const material = getMaterial(scene, "vox-material", "standard");
  // const material = Visuals.getMaterial(scene, "vox-material", "pbr");
  // material.
  material.specularColor = c3("black");
  sps.mesh.material = material;

  sps.setParticles();
  return sps;
};
