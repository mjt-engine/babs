import type { Camera } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import type { ModelMesh } from "./ModelBuilder";
export declare const pickMesh: (scene: Scene, x: number, y: number, options?: Partial<{
    camera: Camera;
    predicate: (mesh: ModelMesh) => boolean;
}>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").AbstractMesh> | undefined;
