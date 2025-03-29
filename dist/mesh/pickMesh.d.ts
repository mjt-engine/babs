import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const pickMesh: (scene: Scene, x: number, y: number, options?: Partial<{
    camera: Camera;
    predicate: (mesh: AbstractMesh) => boolean;
}>) => import("@babylonjs/core").Nullable<AbstractMesh> | undefined;
