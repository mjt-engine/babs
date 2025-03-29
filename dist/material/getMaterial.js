import { isDefined } from "@mjt-engine/object";
import { updateMaterial } from "./updateMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
export const getMaterial = (scene, name, options = "standard") => {
    const material = scene.getMaterialByName(name);
    if (isDefined(material)) {
        // updateMaterial(scene, material, options);
        return material;
    }
    const type = typeof options === "string" ? options : options?.type ?? "standard";
    switch (type) {
        case "standard": {
            const material = new StandardMaterial(name, scene);
            updateMaterial(scene, material, options);
            return material;
        }
        case "pbr": {
            const material = new PBRMaterial(name, scene);
            updateMaterial(scene, material, options);
            return material;
        }
        default: {
            throw new Error(`Unknown material type: '${type}'`);
        }
    }
};
//# sourceMappingURL=getMaterial.js.map