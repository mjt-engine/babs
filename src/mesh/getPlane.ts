import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getPlane = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      width: number;
      height: number;
      tag: string | string[];
      billboard: boolean;
    }> = {}
) => {
  return getMesh(scene, name, () => {
    const { width = 1, height = 1, tag } = options;
    const mesh = MeshBuilder.CreatePlane(
      name,
      {
        width,
        height,
      },
      scene
    );
    const { billboard } = options;
    if (billboard) {
      mesh.billboardMode = Mesh.BILLBOARDMODE_ALL;
    }
    updateMesh(scene, mesh, options);
    return mesh;
  });
};
