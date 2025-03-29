import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getSphere = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      radius: number;
    }>
) => {
  const { radius = 0.5 } = options;

  return getMesh(scene, name, () => {
    const mesh = MeshBuilder.CreateSphere(
      name,
      { diameter: radius * 2 },
      scene
    );
    updateMesh(scene, mesh, options);
    return mesh;
  });
};
