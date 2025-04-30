import type { AbstractMesh } from "@babylonjs/core";
import { Scene } from "@babylonjs/core";
export declare const walkMeshes: (mesh: AbstractMesh | Scene, walker: (mesh: AbstractMesh) => void) => void;
