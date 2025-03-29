import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Colors } from "@mjt-engine/color";
import { iff, isDefined } from "@mjt-engine/object";
import { c3 } from "../bab/c3";
import { v3 } from "../bab/v3";
import { getMaterial } from "../material/getMaterial";
export const updateMesh = (scene, mesh, options) => {
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
//# sourceMappingURL=updateMesh.js.map