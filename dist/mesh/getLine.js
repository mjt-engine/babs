import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { c4 } from "../bab/c4";
import { v3 } from "../bab/v3";
import { getMesh } from "./getMesh";
import { updateMesh } from "./updateMesh";
export const getLine = (scene, name, options) => {
    const { updatable = false } = options;
    return getMesh(scene, name, (instance) => {
        return buildLineMesh(scene, name, {
            ...options,
            instance,
            // updatable: undefined,
        });
    }, updatable);
};
const buildLineMesh = (scene, name, options) => {
    const { colors = [], points = [], color = "white", updatable = false, useVertexAlpha, instance, } = options;
    const pointColors = points
        .map((_, index) => colors[index] ?? color)
        .map((c) => c4(c));
    const fleshedPoints = points.map((p) => v3(p));
    const mesh = MeshBuilder.CreateLines(name, {
        points: fleshedPoints,
        colors: pointColors,
        updatable,
        useVertexAlpha,
        instance,
    });
    updateMesh(scene, mesh, options);
    return mesh;
};
//# sourceMappingURL=getLine.js.map