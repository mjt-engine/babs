import { createTextureAtlas } from "./createTextureAtlas";
export declare const Sprites: {
    getSpriteManager: (scene: import("@babylonjs/core").Scene, name: string, options?: Partial<{
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
        options?: import("@babylonjs/core").SpriteManagerOptions;
    }>) => import("..").BabSpriteManager;
    getSprite: (scene: import("@babylonjs/core").Scene, name: string, spriteManagerName: string) => import("@babylonjs/core").Sprite;
    createTextureAtlas: typeof createTextureAtlas;
    getSpritePackedManager: (scene: import("@babylonjs/core").Scene, name: string, options?: Partial<{
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
        options?: import("@babylonjs/core").SpriteManagerOptions;
    }>) => import("..").BabSpriteManager;
};
