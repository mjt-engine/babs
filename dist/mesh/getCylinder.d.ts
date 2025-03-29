import type { Scene } from "@babylonjs/core/scene";
import type { MeshOptions } from "./updateMesh";
export declare const getCylinder: (scene: Scene, name: string, options?: MeshOptions & Partial<{
    height: number;
    arc: number;
    radius: number;
    tag: string | string[];
}>) => import("@babylonjs/core").Mesh;
