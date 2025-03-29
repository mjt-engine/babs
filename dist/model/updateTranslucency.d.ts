import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
export declare const updateTranslucency: (props: UpdateTranslucencyProps) => void;
export type UpdateTranslucencyProps = {
    mesh: AbstractMesh;
    value: number;
    textureMatcher: RegExp;
    meshMatcher: RegExp;
};
