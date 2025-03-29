import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { isDefined } from "@mjt-engine/object";
export const describeMesh = (mesh, search = /.*/, depth = 0) => {
    const padding = "".padStart(depth * 2);
    if (search.test(mesh.name)) {
        console.log(`${padding}mesh: '${mesh.name}'`);
        const material = mesh.material;
        if (isDefined(material)) {
            const entries = Object.entries(material).filter((e) => /.Texture$/.test(e[0]));
            entries.map((entry) => {
                const [key, value] = entry;
                if (value instanceof Texture && key !== "_environmentBRDFTexture") {
                    console.log(`${padding}tex: '${value.name}' (${key})`);
                }
            });
        }
    }
    mesh.getChildMeshes().map((m) => describeMesh(m, search, depth + 1));
};
//# sourceMappingURL=describeMesh.js.map