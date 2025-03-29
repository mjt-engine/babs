import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { extent } from "d3-array";

/** @see https://forum.babylonjs.com/t/get-mesh-bounding-box-position-and-size-in-2d-screen-coordinates/1058  */
export const calcClientRectForMesh = (mesh: AbstractMesh) => {
  // get bounding box of the mesh
  const meshVectors = mesh.getBoundingInfo().boundingBox.vectors;
  const scene = mesh.getScene();
  const canvas = scene.getEngine().getRenderingCanvas();
  if (!canvas) {
    throw new Error("No canvas for scene", { cause: scene });
  }

  // get the matrix and viewport needed to project the vectors onto the screen
  const worldMatrix = mesh.getWorldMatrix();
  const transformMatrix = scene.getTransformMatrix();
  const viewport = scene.activeCamera!.viewport;

  // loop though all the vectors and project them against the current camera viewport to get a set of coordinates
  const coordinates = meshVectors.map((v) => {
    const proj = Vector3.Project(v, worldMatrix, transformMatrix, viewport);
    proj.x = proj.x * canvas.clientWidth;
    proj.y = proj.y * canvas.clientHeight;
    return proj;
  });

  // get the min and max for all the coordinates so we can calculate the largest possible screen size
  // using d3.extent
  const [minX, maxX] = extent(coordinates, (c) => c.x) as number[];
  const [minY, maxY] = extent(coordinates, (c) => c.y) as number[];

  // return a ClientRect from this
  const rect = {
    width: maxX - minX,
    height: maxY - minY,
    left: minX,
    top: minY,
    right: maxX,
    bottom: maxY,
  };

  return rect;
};
