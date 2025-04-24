import type { LinesMesh } from "@babylonjs/core/Meshes/linesMesh";
import type { Scene } from "@babylonjs/core";
import type { Point3 } from "@mjt-engine/math";
import type { MeshOptions } from "./updateMesh";
export declare const getLine: (scene: Scene, name: string, options: MeshOptions & Partial<{
    points: Point3[];
    colors: string[];
    updatable: boolean;
    useVertexAlpha: boolean;
}>) => LinesMesh;
