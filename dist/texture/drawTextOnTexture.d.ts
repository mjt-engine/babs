import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { Point3 } from "@mjt-engine/math";
export declare const drawTextOnTexture: (texture: DynamicTexture, text: string, options?: Partial<{
    color: string;
    outline: boolean;
    outlineColor: string;
    backgroundColor: string;
    text: string;
    textureSize: number;
    textScale: number;
    rotation: Point3;
    fontFamily: string;
    fontStyle: string;
}>) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
