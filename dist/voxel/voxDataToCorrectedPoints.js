import { toVec3 } from "@mjt-engine/math";
import { tuple2, tuple3 } from "@mjt-engine/object";
export const voxDataToCorrectedPoints = (voxData) => {
    const { XYZI, SIZE } = voxData;
    const scale = SIZE.z;
    const xVoxelCenterCorrection = 1 / scale / 2;
    const yVoxelCenterCorrection = 1 / scale / 2;
    // const zVoxelCenterCorrection = (1 / scale) * 2 + 1 / scale / 2;
    const zVoxelCenterCorrection = 1 / scale / 2;
    return XYZI.map((xyzi) => {
        const [x, y, z] = toVec3(xyzi);
        const xx = (x - SIZE.x / 2) / scale + xVoxelCenterCorrection;
        const yy = (y - SIZE.y / 2) / scale + yVoxelCenterCorrection;
        // TODO make +z 'up'
        const zz = (z - SIZE.z / 2) / -scale - zVoxelCenterCorrection;
        return tuple2(tuple3(xx, yy, zz), xyzi.i);
    });
};
//# sourceMappingURL=voxDataToCorrectedPoints.js.map