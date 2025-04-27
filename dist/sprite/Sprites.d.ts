import { createTextureAtlas } from "./createTextureAtlas";
export declare const Sprites: {
    getSpriteManager: (scene: import("@babylonjs/core").Scene, name: string, options?: Partial<{
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
        options?: import("@babylonjs/core").SpriteManagerOptions;
    }>) => import("@babylonjs/core").ISpriteManager | import("@babylonjs/core").SpriteManager;
    getSprite: (scene: import("@babylonjs/core").Scene, name: string, spriteManagerName: string) => import("@babylonjs/core").Sprite;
    createTextureAtlas: typeof createTextureAtlas;
};
