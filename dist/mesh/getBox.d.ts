import type { Scene } from "@babylonjs/core";
import type { MeshOptions } from "./updateMesh";
export type BoxOptions = Partial<{
    width: number;
    height: number;
    depth: number;
    colors: string[];
}>;
export declare const getBox: (scene: Scene, name: string, options?: MeshOptions & BoxOptions) => import("@babylonjs/core").Mesh;
