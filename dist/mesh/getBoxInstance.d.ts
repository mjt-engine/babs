import type { Scene } from "@babylonjs/core/scene";
import type { MeshOptions } from "./updateMesh";
export declare const getBoxInstance: (scene: Scene, name: string, options: MeshOptions & Partial<{
    width: number;
    height: number;
    depth: number;
    receiveShadows: boolean;
}>) => import("@babylonjs/core").InstancedMesh;
