import type { Scene } from "@babylonjs/core/scene";
export declare const destroyMesh: (scene: Scene, name: string, options?: Partial<{
    recurse: boolean;
    disposeMaterials: boolean;
    disposeTextures: boolean;
}>) => void;
