import type { InstancedMesh } from "@babylonjs/core";
import type { Mesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const getMesh: <T extends Mesh | InstancedMesh>(scene: Scene, name: string, producer: (instance?: T) => T, updatable?: boolean) => T;
