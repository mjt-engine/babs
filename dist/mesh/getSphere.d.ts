import type { Scene } from "@babylonjs/core/scene";
import type { MeshOptions } from "./updateMesh";
export declare const getSphere: (scene: Scene, name: string, options: MeshOptions & Partial<{
    radius: number;
}>) => import("@babylonjs/core").Mesh;
