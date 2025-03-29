import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const getMeshInstanceAsync: <T extends Mesh>(scene: Scene, name: string, rootName: string, producer: () => Promise<T>) => Promise<import("@babylonjs/core").InstancedMesh>;
