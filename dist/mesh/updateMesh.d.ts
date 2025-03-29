import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import type { Point2, Point3 } from "@mjt-engine/math";
export type MeshOptions = Partial<{
    position: Point3 | Point2;
    color: string;
    material: string;
    receiveShadows: boolean;
}>;
export declare const updateMesh: (scene: Scene, mesh: Mesh | InstancedMesh, options: MeshOptions) => void;
