import { Mesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import type { VoxData } from "@mjt-engine/magica-voxels";
export declare const voxDataToMergedModel: (scene: Scene, voxData: VoxData, name: string) => Mesh;
