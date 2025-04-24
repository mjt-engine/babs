import type { AbstractMesh } from "@babylonjs/core";
export declare const HIDE: never[];
export declare const GLOSS: string[];
export type UpdateColorProps = {
    mesh: AbstractMesh;
    color: string;
    textureMatcher: RegExp;
    meshMatcher: RegExp;
};
export declare const updateColor: (props: UpdateColorProps) => void;
