import type { Ray, TrianglePickingPredicate } from "@babylonjs/core";
import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const pickWithRay: (scene: Scene, ray: Ray, options?: Partial<{
    predicate: (mesh: AbstractMesh) => boolean;
    fastCheck: boolean;
    trianglePredicate: TrianglePickingPredicate;
}>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").PickingInfo>;
