import type { Scene } from "@babylonjs/core/scene";
import type { MeshOptions } from "./updateMesh";
export declare const BabPolyMap: {
    tetrahedron: number;
    octahedron: number;
    dodecahedron: number;
    icosahedron: number;
    rhombicuboctahadron: number;
    triangularPrism: number;
    pentagonalPrism: number;
    hexagonalPrism: number;
    squarePyramid: number;
    pentagonalPyramid: number;
    triangularDipyramid: number;
    pentagonalDipryramid: number;
    elongatedSquareDipyramid: number;
    elongatedPentagonalDipyramid: number;
    elongatedPentagonalCupola: number;
};
export declare const getPolyhedron: (scene: Scene, name: string, options?: MeshOptions & Partial<{
    size: number;
    type: keyof typeof BabPolyMap;
    material: string;
}>) => import("@babylonjs/core").Mesh;
