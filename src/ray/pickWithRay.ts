import type { Ray, TrianglePickingPredicate } from "@babylonjs/core";
import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";

export const pickWithRay = (
  scene: Scene,
  ray: Ray,
  options: Partial<{
    predicate: (mesh: AbstractMesh) => boolean;
    fastCheck: boolean;
    trianglePredicate: TrianglePickingPredicate;
  }> = {}
) => {
  const {
    trianglePredicate,
    fastCheck,
    predicate = (mesh: AbstractMesh) => mesh.isPickable,
  } = options;
  return scene.pickWithRay(ray, predicate, fastCheck, trianglePredicate);
};
