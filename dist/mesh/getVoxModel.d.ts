import type { Scene } from "@babylonjs/core";
import type { MeshOptions } from "./updateMesh";
export declare const getVoxModel: (scene: Scene, name: string, src: string, options?: MeshOptions & Partial<{
    merged: boolean;
}>) => import("@babylonjs/core").SolidParticleSystem;
