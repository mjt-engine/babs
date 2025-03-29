import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";
import { isDefined } from "@mjt-engine/object";

export const getTransformNode = (scene: Scene, name: string): TransformNode => {
  const node = scene.getTransformNodeByName(name);
  if (isDefined(node)) {
    return node;
  }
  return new TransformNode(name, scene);
};
