import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Point3 } from "@mjt-engine/math";
import { toVec3 } from "@mjt-engine/math";

export const calcTopOfMeshWorldPosition = (mesh: AbstractMesh) => {
  mesh.computeWorldMatrix(true);
  mesh.refreshBoundingInfo({});
  const [x, y, z] = toVec3(mesh.getAbsolutePosition());

  // const radius = mesh.getBoundingInfo().boundingSphere.radius;
  const radius = mesh.getBoundingInfo().boundingSphere.radius;
  // const top = mesh.getBoundingInfo().boundingBox.
  return [x, y, z - radius] as Point3;
};
