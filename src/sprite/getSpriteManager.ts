import {
  type Scene,
  SpriteManager,
  SpriteManagerOptions,
} from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const getSpriteManager = (
  scene: Scene,
  name: string,
  options: Partial<{
    capacity: number;
    cellSize: { width: number; height: number } | number;
    imgUrl: string;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
  }> = {}
) => {
  const managerMaybe = scene?.spriteManagers?.find((sm) => sm.name === name);
  if (isDefined(managerMaybe)) {
    return managerMaybe;
  }
  const {
    capacity = 1,
    cellSize,
    imgUrl,
    epsilon,
    samplingMode,
    fromPacked,
    spriteJSON,
    options: spriteManagerOptions,
  } = options;
  if (!imgUrl) {
    throw new Error("imgUrl is required", { cause: options });
  }
  return new SpriteManager(
    name,
    imgUrl,
    capacity,
    cellSize,
    scene,
    epsilon,
    samplingMode,
    fromPacked,
    spriteJSON,
    spriteManagerOptions
  );
};
