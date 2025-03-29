import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import type { TEXTURE_SAMPLING_MODES } from "./TEXTURE_SAMPLING_MODES";
export type TextureSamplingModeMap = typeof TEXTURE_SAMPLING_MODES;
export type TextureOptions = Partial<{
    hasAlpha: boolean;
    generateMipMaps: boolean;
    samplingMode: keyof TextureSamplingModeMap;
}>;
export type HtmlElementTextureOptions = Partial<TextureOptions & {
    element: HTMLCanvasElement | HTMLVideoElement;
}>;
export type PathTextureOptions = Partial<TextureOptions & {
    src: string;
}>;
export type DynamicTextureOptions = Partial<TextureOptions & {
    width: number;
    height: number;
    init: (ctx: ICanvasRenderingContext) => void;
}>;
export type AllTextureOptions = HtmlElementTextureOptions & DynamicTextureOptions;
export declare const Textures: {
    builder: ({ size }?: {
        size: number;
    }) => import("./builder").TextureBuilder;
    copyToCanvas: (image: HTMLCanvasElement | OffscreenCanvas | HTMLImageElement, width?: number, height?: number) => HTMLCanvasElement;
    debugImage: (image: HTMLCanvasElement | HTMLImageElement, label?: string) => Promise<unknown>;
    getTexture: <T extends import("@babylonjs/core").BaseTexture>(scene: import("@babylonjs/core").Scene, name: string, producer: () => T) => T;
    getHtmlElementTexture: (scene: import("@babylonjs/core").Scene, name: string, options: HtmlElementTextureOptions) => import("@babylonjs/core").HtmlElementTexture;
    getDynamicTexture: (scene: import("@babylonjs/core").Scene, name: string, options?: DynamicTextureOptions) => import("@babylonjs/core").DynamicTexture;
    getPathTexture: (scene: import("@babylonjs/core").Scene, name: string, options: PathTextureOptions) => import("@babylonjs/core").Texture;
    updateTexture: (texture: import("@babylonjs/core").BaseTexture, options: AllTextureOptions) => void;
    imageToTexture: (scene: import("@babylonjs/core").Scene, name: string, image: string | HTMLImageElement | HTMLCanvasElement | OffscreenCanvas) => Promise<import("@babylonjs/core").Texture>;
    drawTextOnTexture: (texture: import("@babylonjs/core").DynamicTexture, text: string, options?: Partial<{
        color: string;
        outline: boolean;
        outlineColor: string;
        backgroundColor: string;
        text: string;
        textureSize: number;
        textScale: number;
        rotation: import("@mjt-engine/math").Point3;
        fontFamily: string;
        fontStyle: string;
    }>) => {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    drawOnTexture: (texture: import("@babylonjs/core").DynamicTexture, render: (ctx: ICanvasRenderingContext, size: {
        width: number;
        height: number;
    }) => void) => void;
    drawBackgroundOnTexture: (texture: import("@babylonjs/core").DynamicTexture, options?: Partial<{
        color: string;
    }>) => void;
    clearTexture: (texture: import("@babylonjs/core").DynamicTexture) => void;
    destroyTexture: (scene: import("@babylonjs/core").Scene, name: string) => void;
};
