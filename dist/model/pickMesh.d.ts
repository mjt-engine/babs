import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { Scene } from "@babylonjs/core/scene";
import type { ModelMesh } from "./ModelBuilder";
export declare const pickMesh: (scene: Scene, x: number, y: number, options?: Partial<{
    camera: Camera;
    predicate: (mesh: ModelMesh) => boolean;
}>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").AbstractMesh> | undefined;
