import { Mesh } from "@babylonjs/core";
import { Tags } from "@babylonjs/core/Misc/tags";
import type { Scene } from "@babylonjs/core";
import { Colors } from "@mjt-engine/color";
import type { VoxData } from "@mjt-engine/magica-voxels";
import { v3 } from "../bab/v3";
import { getBoxInstance } from "../mesh/getBoxInstance";

export const voxDataToComplexModel = (
  scene: Scene,
  voxData: VoxData,
  name: string
) => {
  const { XYZI, RGBA } = voxData;

  const colors = RGBA.map((rgba) => {
    const { r, g, b, a } = rgba;
    return Colors.builder({ color: [r, g, b, a], model: "rgba" }).toString();
  });
  const parent = new Mesh(name, scene);
  // const centeringNode = new Mesh(`centering-${name}`);
  const meshes = XYZI.map((xyzi, index) => {
    const color = colors[xyzi.i];
    const mesh = getBoxInstance(scene, `voxel-${color}`, {
      color,
      material: `voxel-material-${color}`,
    });
    mesh.position = v3(xyzi);
    // mesh.parent = centeringNode;
    mesh.parent = parent;

    return mesh;
  });
  Tags.AddTagsTo(parent, "complex");
  return parent;
};
