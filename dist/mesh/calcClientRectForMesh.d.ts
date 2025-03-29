import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
/** @see https://forum.babylonjs.com/t/get-mesh-bounding-box-position-and-size-in-2d-screen-coordinates/1058  */
export declare const calcClientRectForMesh: (mesh: AbstractMesh) => {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
};
