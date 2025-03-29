import type { Scene } from "@babylonjs/core/scene";
import type { MeshOptions } from "./updateMesh";
export declare const getTorusKnot: (scene: Scene, name: string, options?: MeshOptions & Partial<{
    radius: number;
    material: string;
}>) => import("@babylonjs/core").Mesh;
