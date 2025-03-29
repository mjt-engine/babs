import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
export const totalBoundingInfo = function (meshes) {
    let boundingInfo = meshes[0].getBoundingInfo();
    let min = boundingInfo.minimum.add(meshes[0].position);
    let max = boundingInfo.maximum.add(meshes[0].position);
    for (let i = 1; i < meshes.length; i++) {
        const mesh = meshes[i];
        mesh.refreshBoundingInfo(true, true);
        boundingInfo = mesh.getBoundingInfo();
        min = Vector3.Minimize(min, boundingInfo.minimum.add(mesh.position));
        max = Vector3.Maximize(max, boundingInfo.maximum.add(mesh.position));
    }
    return new BoundingInfo(min, max);
};
//# sourceMappingURL=totalBoundingInfo.js.map