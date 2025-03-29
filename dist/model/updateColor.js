import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { isDefined } from "@mjt-engine/object";
import { c3 } from "../bab/c3";
export const HIDE = [
// "Irises",
// "Pupils",
// "Sclera", // corner of the eye
// "Eyelashes",
// "EyeSocket"
// "Face",
// "Teeth",
// "Lips",
// "Mouth",
// "Ears",
// "Torso",
];
export const GLOSS = [
    "Irises",
    "Pupils",
    "Sclera",
    // "Eyelashes",
    // "EyeSocket",
    // "Face",
    // "Teeth",
    // "Lips",
    // "Mouth",
    // "Ears",
    // "Torso",
];
export const updateColor = (props) => {
    const { mesh, color, textureMatcher = /.*/, meshMatcher = /.*/ } = props;
    const textures = mesh?.material?.getActiveTextures() ?? [];
    if (isDefined(textures.find((t) => {
        const texName = t?.name;
        return textureMatcher.test(texName);
    }))) {
        const material = mesh.material;
        if (material instanceof PBRMaterial) {
            material.albedoColor = c3(color);
            material.metallic = 0;
            material.roughness = 0.8;
        }
        else {
            console.log({ material });
            console.warn(`SKIPPING RECOLORING: ${textureMatcher} as material is not PBR`);
        }
    }
    mesh.getChildMeshes().map((mesh) => updateColor({ ...props, mesh }));
};
//# sourceMappingURL=updateColor.js.map