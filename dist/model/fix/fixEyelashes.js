import { Color3 } from "@babylonjs/core/Maths/math.color";
export const fixEyelashes = (scene) => {
    console.log("fixing eyelashes", scene.meshes);
    scene.meshes.forEach((mesh) => {
        if (mesh.name.includes("Eyelashes")) {
            console.log("fixing eyelashes", mesh.name);
            // mesh.setEnabled(false); // TODO re-enable eyelashes when morphs fixed
            if (mesh.name.includes("primitive1")) {
                console.log("fixing eyelashes: primitive1", mesh.name);
                const material = mesh.material;
                if (!material) {
                    throw new Error("Mesh has no material", { cause: mesh });
                }
                const texture = material.getActiveTextures()[0];
                texture.hasAlpha = true;
                texture.getAlphaFromRGB = true;
                material.transparencyMode = 1;
                material.opacityTexture = texture;
                mesh.visibility = 0.5;
                material.albedoColor = new Color3(0, 0, 0);
            }
        }
    });
};
//# sourceMappingURL=fixEyelashes.js.map