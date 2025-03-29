import type { Mesh } from "@babylonjs/core/Meshes/mesh";

export const groupMeshesByMaterial = (meshes: Mesh[]) => {
  const result: Record<string, Mesh[]> = {};

  meshes.forEach((mesh) => {
    const materialName = mesh?.material?.name;
    if (!materialName) {
      throw new Error("Mesh material is missing name", { cause: mesh });
    }
    const meshes = result[materialName] ?? [];
    meshes.push(mesh);
    result[materialName] = meshes;
  });
  return result;
};
