import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { isDefined } from "@mjt-engine/object";
export const getTransformNode = (scene, name) => {
    const node = scene.getTransformNodeByName(name);
    if (isDefined(node)) {
        return node;
    }
    return new TransformNode(name, scene);
};
//# sourceMappingURL=getTransformNode.js.map