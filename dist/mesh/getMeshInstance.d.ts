import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const getMeshInstance: <T extends Mesh>(scene: Scene, name: string, rootName: string, producer: () => T) => import("@babylonjs/core").InstancedMesh;
