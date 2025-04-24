import type { Camera } from "@babylonjs/core";
import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const pickMesh: (scene: Scene, x: number, y: number, options?: Partial<{
    camera: Camera;
    predicate: (mesh: AbstractMesh) => boolean;
}>) => import("@babylonjs/core").Nullable<AbstractMesh> | undefined;
