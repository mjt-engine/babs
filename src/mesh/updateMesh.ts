import { StandardMaterial } from "@babylonjs/core";
import type { InstancedMesh } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { Colors } from "@mjt-engine/color";
import type { Point2, Point3 } from "@mjt-engine/math";
import { iff, isDefined } from "@mjt-engine/object";
import { c3 } from "../bab/c3";
import { v3 } from "../bab/v3";
import { getMaterial } from "../material/getMaterial";

export type MeshOptions = Partial<{
  position: Point3 | Point2;
  // texture: string;
  color: string;
  material: string;
  receiveShadows: boolean;
}>;

export const updateMesh = (
  scene: Scene,
  mesh: Mesh | InstancedMesh,
  options: MeshOptions
) => {
  const { position, color, material, receiveShadows } = options;

  if (mesh instanceof Mesh && isDefined(material)) {
    mesh.material = getMaterial(scene, material, "standard");
  }

  if (mesh instanceof Mesh && isDefined(receiveShadows)) {
    mesh.receiveShadows = receiveShadows;
  }

  iff(position, (p) => {
    mesh.position = v3(p);
  });

  iff(color, (c) => {
    const material = mesh.material;
    if (material instanceof StandardMaterial) {
      material.diffuseColor = c3(c);
      const alpha = Colors.from(c).alpha();
      if (alpha < 1) {
        material.alpha = alpha;
      }
      material.specularColor = c3("black");
      material.ambientColor = c3(c);
      material.emissiveColor = c3(c);
    }
  });
};
