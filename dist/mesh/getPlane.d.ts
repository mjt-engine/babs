import { Mesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import type { MeshOptions } from "./updateMesh";
export declare const getPlane: (scene: Scene, name: string, options?: MeshOptions & Partial<{
    width: number;
    height: number;
    tag: string | string[];
    billboard: boolean;
}>) => Mesh;
