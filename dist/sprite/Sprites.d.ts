import { Sprite } from "@babylonjs/core";
import { SpriteManager } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export type SpriteManagerOptions = Partial<{
    capacity: number;
    cellSize: {
        width: number;
        height: number;
    } | number;
    imgUrl: string;
}>;
export declare const getSpriteManager: (scene: Scene, name: string, options?: SpriteManagerOptions) => import("@babylonjs/core").ISpriteManager | SpriteManager;
export declare const getSprite: (scene: Scene, name: string, spriteManagerName: string) => Sprite;
export declare const Sprites: {
    getSpriteManager: (scene: Scene, name: string, options?: SpriteManagerOptions) => import("@babylonjs/core").ISpriteManager | SpriteManager;
    getSprite: (scene: Scene, name: string, spriteManagerName: string) => Sprite;
};
