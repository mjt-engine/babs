import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const getMeshAsync: <T extends Mesh | InstancedMesh>(scene: Scene, name: string, producer: () => Promise<T>) => Promise<T>;
