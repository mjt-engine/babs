import { type Scene, SpriteManager, SpriteManagerOptions } from "@babylonjs/core";
export declare const getSpriteManager: (scene: Scene, name: string, options?: Partial<{
    capacity: number;
    cellSize: {
        width: number;
        height: number;
    } | number;
    imgUrl: string;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
}>) => import("@babylonjs/core").ISpriteManager | SpriteManager;
