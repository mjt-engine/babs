import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
export declare const drawOnTexture: (texture: DynamicTexture, render: (ctx: ICanvasRenderingContext, size: {
    width: number;
    height: number;
}) => void) => void;
