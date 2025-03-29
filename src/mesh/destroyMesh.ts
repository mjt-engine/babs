import type { Scene } from "@babylonjs/core/scene";

export const destroyMesh = (
  scene: Scene,
  name: string,
  options: Partial<{
    recurse: boolean;
    disposeMaterials: boolean;
    disposeTextures: boolean;
  }> = {}
) => {
  const {
    recurse = true,
    disposeMaterials = false,
    disposeTextures = false,
  } = options;
  const mesh = scene.getMeshByName(name);
  if (!mesh) {
    return;
  }
  mesh.dispose(!recurse, false);
  if (disposeMaterials) {
    const material = mesh.material;
    if (!material) {
      return;
    }
    material.name = `DISPOSED-${material.name}`;
    material?.dispose(true, disposeTextures);
    scene.removeMaterial(material);
  }
  scene.removeMesh(mesh);
};
