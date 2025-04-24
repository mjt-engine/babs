import { Sprite } from "@babylonjs/core";
import { SpriteManager } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { assertValue } from "@mjt-engine/assert";
import { isDefined } from "@mjt-engine/object";

export type SpriteManagerOptions = Partial<{
  capacity: number;
  cellSize: { width: number; height: number } | number;
  imgUrl: string;
}>;

export const getSpriteManager = (
  scene: Scene,
  name: string,
  options: SpriteManagerOptions = {}
) => {
  const managerMaybe = scene?.spriteManagers?.find((sm) => sm.name === name);
  if (isDefined(managerMaybe)) {
    return managerMaybe;
  }
  const { capacity = 1, cellSize, imgUrl } = options;
  if (!imgUrl) {
    throw new Error("imgUrl is required", { cause: options });
  }
  return new SpriteManager(name, imgUrl, capacity, cellSize, scene);
};

export const getSprite = (
  scene: Scene,
  name: string,
  spriteManagerName: string
): Sprite => {
  const spriteManager = assertValue(getSpriteManager(scene, spriteManagerName));
  const spriteMaybe = spriteManager?.sprites?.find((s) => s.name === name);
  if (isDefined(spriteMaybe)) {
    return spriteMaybe;
  }
  return new Sprite(name, spriteManager);
};
export const Sprites = { getSpriteManager, getSprite };
