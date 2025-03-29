export const pickWithRay = (scene, ray, options = {}) => {
    const { trianglePredicate, fastCheck, predicate = (mesh) => mesh.isPickable, } = options;
    return scene.pickWithRay(ray, predicate, fastCheck, trianglePredicate);
};
//# sourceMappingURL=pickWithRay.js.map