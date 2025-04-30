import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const pickMeshes: (scene: Scene, x: number, y: number, options?: Partial<{
    camera: Camera;
    predicate: (mesh: AbstractMesh) => boolean;
}>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").PickingInfo[]>;
