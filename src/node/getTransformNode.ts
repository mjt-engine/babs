import { TransformNode } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const getTransformNode = (scene: Scene, name: string): TransformNode => {
  const node = scene.getTransformNodeByName(name);
  if (isDefined(node)) {
    return node;
  }
  return new TransformNode(name, scene);
};
