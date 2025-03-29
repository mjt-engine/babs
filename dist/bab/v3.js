import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { toVec3 } from "@mjt-engine/math";
export function v3(xOrPosition = 0, y = 0, z = 0) {
    if (typeof xOrPosition === "number") {
        return new Vector3(xOrPosition, y, z);
    }
    const [xx = 0, yy = 0, zz = 0] = toVec3(xOrPosition);
    return new Vector3(xx, yy, zz);
}
//# sourceMappingURL=v3.js.map