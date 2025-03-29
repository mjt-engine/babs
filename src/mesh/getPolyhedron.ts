import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const BabPolyMap = {
  tetrahedron: 0,
  octahedron: 1,
  dodecahedron: 2,
  icosahedron: 3,
  rhombicuboctahadron: 4,
  triangularPrism: 5,
  pentagonalPrism: 6,
  hexagonalPrism: 7,
  squarePyramid: 8,
  pentagonalPyramid: 9,
  triangularDipyramid: 10,
  pentagonalDipryramid: 11,
  elongatedSquareDipyramid: 12,
  elongatedPentagonalDipyramid: 13,
  elongatedPentagonalCupola: 14,
};

export const getPolyhedron = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      size: number;
      type: keyof typeof BabPolyMap;
      material: string;
    }> = {}
) => {
  return getMesh(scene, name, () => {
    const { size = 1, type = "tetrahedron" } = options;
    const mesh = MeshBuilder.CreatePolyhedron(
      name,
      { type: BabPolyMap[type], size },
      scene
    );
    updateMesh(scene, mesh, options);
    return mesh;
  });
};
