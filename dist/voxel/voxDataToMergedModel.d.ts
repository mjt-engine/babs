import { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";
import type { VoxData } from "@mjt-engine/magica-voxels";
export declare const voxDataToMergedModel: (scene: Scene, voxData: VoxData, name: string) => Mesh;
