import type { ModelMesh, ModelMeshMapper } from "./ModelBuilder";

export const meshFixer = (mesh: ModelMesh, mapper: ModelMeshMapper) => {
  mesh = mapper(mesh);
  mesh.getChildMeshes().map((m) => meshFixer(m, mapper));
  return mesh;
};
