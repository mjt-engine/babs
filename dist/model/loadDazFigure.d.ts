import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
export declare const loadDazFigure: (props: {
    path: string | File;
    scene: Scene;
    name?: string;
}) => Promise<AbstractMesh>;
