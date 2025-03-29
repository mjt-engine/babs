import type { Scene } from "@babylonjs/core/scene";
import { isUndefined } from "@mjt-engine/object";
import { voxDataToSps } from "../voxel/voxDataToSps";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getVoxModel = (
  scene: Scene,
  name: string,
  src: string,

  options: MeshOptions &
    Partial<{
      merged: boolean;
    }> = {}
) => {
  // return getMesh(scene, name, () => {
  const metadata = scene.metadata ?? {};
  const { voxes = {} } = metadata;
  const voxData = voxes[src];
  if (isUndefined(voxData)) {
    console.log({ scene, name, src });
    throw new Error(`No voxData found for ${src} ${name}`);
  }

  const sps = voxDataToSps(scene, voxData, name);
  const mesh = sps.mesh;

  // sps.mesh.setEnabled(false);

  // const { merged = true } = options;
  // const mesh = merged
  //   ? voxDataToMergedModel(scene, voxData, name)
  //   : voxDataToComplexModel(scene, voxData, name);

  updateMesh(scene, mesh, options);
  return sps;
  // });
};
