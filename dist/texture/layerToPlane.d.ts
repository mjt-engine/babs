import type { Scene } from "@babylonjs/core";
import type { TextureImageSrc } from "./TextureImageSrc";
import type { TextureLayer } from "./TextureLayer";
export declare const hasValidId: (obj: {
    id: string | number;
} | string) => boolean;
export declare const idOfImageSrc: (src: TextureImageSrc) => string | undefined;
export declare const layerToPlane: (layer: TextureLayer, scene: Scene) => Promise<import("@babylonjs/core").Mesh>;
