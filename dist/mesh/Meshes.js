import { getBox } from "./getBox";
import { getBoxInstance } from "./getBoxInstance";
import { getSphere } from "./getSphere";
import { pickMesh } from "./pickMesh";
import { calcTopOfMeshWorldPosition } from "./calcTopOfMeshWorldPosition";
import { walkMeshes } from "./walkMeshes";
import { getPolyhedron } from "./getPolyhedron";
// BS babylonjs 'magic'
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
// import "babylonjs-inspector";
// import "babylonjs/Debug/debugLayer";
import { calcClientRectForMesh } from "./calcClientRectForMesh";
import { destroyMesh } from "./destroyMesh";
import { findClosestPick } from "./findClosestPick";
import { getCylinder } from "./getCylinder";
import { getLine } from "./getLine";
import { getMesh } from "./getMesh";
import { getMeshAsync } from "./getMeshAsync";
import { getMeshInstance } from "./getMeshInstance";
import { getMeshInstanceAsync } from "./getMeshInstanceAsync";
import { getPlane } from "./getPlane";
import { getTorusKnot } from "./getTorusKnot";
import { getVoxModel } from "./getVoxModel";
import { isInstancedMesh } from "./isInstancedMesh";
import { lookAt } from "./lookAt";
import { mergeMeshes } from "./mergeMeshes";
import { pickMeshes } from "./pickMeshes";
import { updateArcRotateCameraPosition } from "./updateArcRotateCameraPosition";
import { updateMesh } from "./updateMesh";
export const Meshes = {
    lookAt,
    getBox,
    getPlane,
    getBoxInstance,
    getSphere,
    getCylinder,
    getTorusKnot,
    getLine,
    walkMeshes,
    pickMesh,
    getMesh,
    getMeshAsync,
    calcTopOfMeshWorldPosition,
    mergeMeshes,
    getVoxModel,
    calcClientRectForMesh,
    updateArcRotateCameraPosition,
    findClosestPick,
    destroyMesh,
    getMeshInstance,
    getMeshInstanceAsync,
    isInstancedMesh,
    pickMeshes,
    getPolyhedron,
    updateMesh
};
//# sourceMappingURL=Meshes.js.map