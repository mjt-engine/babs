import { Mesh } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
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
      doubleSided: boolean;
    }> = {}
) => {
  return getMesh(scene, name, () => {
    const { width = 1, height = 1, tag, doubleSided  } = options;
    const mesh = MeshBuilder.CreatePlane(
      name,
      {
        width,
        height,
        sideOrientation: doubleSided ? Mesh.DOUBLESIDE : undefined,
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
