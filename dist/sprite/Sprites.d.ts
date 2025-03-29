import { Sprite } from "@babylonjs/core/Sprites/sprite";
import { SpriteManager } from "@babylonjs/core/Sprites/spriteManager";
import type { Scene } from "@babylonjs/core/scene";
export type SpriteManagerOptions = Partial<{
    capacity: number;
    cellSize: {
        width: number;
        height: number;
    } | number;
    imgUrl: string;
}>;
export declare const getSpriteManager: (scene: Scene, name: string, options?: SpriteManagerOptions) => import("@babylonjs/core/Sprites/spriteManager").ISpriteManager | SpriteManager;
export declare const getSprite: (scene: Scene, name: string, spriteManagerName: string) => Sprite;
export declare const Sprites: {
    getSpriteManager: (scene: Scene, name: string, options?: SpriteManagerOptions) => import("@babylonjs/core/Sprites/spriteManager").ISpriteManager | SpriteManager;
    getSprite: (scene: Scene, name: string, spriteManagerName: string) => Sprite;
};
