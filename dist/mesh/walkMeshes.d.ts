import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Scene } from "@babylonjs/core/scene";
export declare const walkMeshes: (mesh: AbstractMesh | Scene, walker: (mesh: AbstractMesh) => void) => void;
