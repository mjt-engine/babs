import type { AbstractMesh } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
/** WARNING!!!!!!
 *
 * YOU MUST LOAD THE GLTF2 LOADER FIRST!!!
 * import { GLTF2 } from "@babylonjs/loaders/glTF";
 *
 */
export declare const loadDazFigure: (props: {
    path: string | File;
    scene: Scene;
    name?: string;
}) => Promise<AbstractMesh>;
