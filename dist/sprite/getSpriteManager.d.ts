import { type Scene, SpriteManagerOptions } from "@babylonjs/core";
import { BabSpriteManager } from "../type/BabSpriteManager";
export declare const getSpritePackedManager: (scene: Scene, name: string, options?: Partial<{
    capacity: number;
    cellSize: {
        width: number;
        height: number;
    } | number;
    atlasUrl: string;
    atlasBlob?: Blob;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
}>) => BabSpriteManager;
export declare const getSpriteManager: (scene: Scene, name: string, options?: Partial<{
    capacity: number;
    cellSize: {
        width: number;
        height: number;
    } | number;
    atlasUrl: string;
    atlasBlob?: Blob;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
}>) => BabSpriteManager;
