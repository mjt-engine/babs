import type { Ray, TrianglePickingPredicate } from "@babylonjs/core/Culling/ray";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const pickWithRay: (scene: Scene, ray: Ray, options?: Partial<{
    predicate: (mesh: AbstractMesh) => boolean;
    fastCheck: boolean;
    trianglePredicate: TrianglePickingPredicate;
}>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").PickingInfo>;
