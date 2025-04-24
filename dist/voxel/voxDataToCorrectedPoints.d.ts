import type { VoxData } from "@mjt-engine/magica-voxels";
import type { Point3 } from "@mjt-engine/math";
export type Point3ColorIndex = [Point3, number];
export declare const voxDataToCorrectedPoints: (voxData: VoxData) => import("@mjt-engine/object").Tuple2<import("@mjt-engine/object").Tuple3<number, number, number>, number>[];
