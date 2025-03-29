import type { LinesMesh } from "@babylonjs/core/Meshes/linesMesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";
import type { Point3 } from "@mjt-engine/math";
import { c4 } from "../bab/c4";
import { v3 } from "../bab/v3";
import { getMesh } from "./getMesh";
import type { MeshOptions } from "./updateMesh";
import { updateMesh } from "./updateMesh";

export const getLine = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      points: Point3[];
      colors: string[];
      updatable: boolean;
      useVertexAlpha: boolean;
    }>
) => {
  const { updatable = false } = options;

  return getMesh(
    scene,
    name,
    (instance: LinesMesh | undefined) => {
      return buildLineMesh(scene, name, {
        ...options,
        instance,
        // updatable: undefined,
      });
    },
    updatable
  );
};

const buildLineMesh = (
  scene: Scene,
  name: string,
  options: MeshOptions &
    Partial<{
      points: Point3[];
      colors: string[];
      updatable: boolean;
      useVertexAlpha: boolean;
      instance: LinesMesh;
    }>
) => {
  const {
    colors = [],
    points = [],
    color = "white",
    updatable = false,
    useVertexAlpha,
    instance,
  } = options;
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
