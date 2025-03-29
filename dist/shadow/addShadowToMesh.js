import { removeShadowFromMesh } from "../mesh/removeShadowFromMesh";
export const addShadowToMesh = (mesh) => {
    const scene = mesh.getScene();
    const shadowCasters = scene.getLightsByTags("shadowCaster");
    shadowCasters.forEach((caster) => {
        const shadowGenerator = caster.metadata["shadowGenerator"];
        shadowGenerator.addShadowCaster(mesh);
    });
    return () => {
        removeShadowFromMesh(mesh);
    };
};
//# sourceMappingURL=addShadowToMesh.js.map