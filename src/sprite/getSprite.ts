import { type Scene, Sprite } from "@babylonjs/core";
import { assertValue } from "@mjt-engine/assert";
import { isDefined } from "@mjt-engine/object";
import { getSpriteManager } from "./getSpriteManager";

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
