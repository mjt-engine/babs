import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getCylinder = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      height: number;
      arc: number;
      radius: number;
      tag: string | string[];
    }> = {}
) => {
  return getMesh(scene, name, () => {
    const { arc = 1, height = 1, radius = 0.5, tag } = options;
    const mesh = MeshBuilder.CreateCylinder(
      name,
      {
        height,
        arc,
        diameter: radius * 2,
      },
      scene
    );
    updateMesh(scene, mesh, options);
    return mesh;
  });
};
