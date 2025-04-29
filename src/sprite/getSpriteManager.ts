import {
  type Scene,
  SpriteManager,
  SpriteManagerOptions,
  SpriteMap,
  SpritePackedManager,
} from "@babylonjs/core";
import { isDefined, isUndefined } from "@mjt-engine/object";
import { BabSpriteManager } from "../type/BabSpriteManager";

export const getSpritePackedManager = (
  scene: Scene,
  name: string,
  options: Partial<{
    capacity: number;
    cellSize: { width: number; height: number } | number;
    atlasUrl: string;
    atlasBlob?: Blob;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
  }> = {}
): BabSpriteManager => {
  const managerMaybe = scene?.spriteManagers?.find((sm) => sm.name === name);
  if (isDefined(managerMaybe)) {
    return managerMaybe as BabSpriteManager;
  }
  const {
    capacity = 1,
    atlasUrl,
    atlasBlob,
    epsilon,
    samplingMode,
    spriteJSON,
    options: spriteManagerOptions,
  } = options;
  let objectUrl: string | undefined;
  try {
    if (atlasBlob) {
      objectUrl = URL.createObjectURL(atlasBlob);
    }
    const realizedUrl = isDefined(atlasUrl) ? atlasUrl : objectUrl;
    if (isUndefined(realizedUrl)) {
      throw new Error("altasUrl or atlasBlob is required", { cause: options });
    }
    return new SpritePackedManager(
      name,
      realizedUrl,
      capacity,
      scene,
      spriteJSON,
      epsilon,
      samplingMode,
      spriteManagerOptions
    );
  } finally {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }
};

export const getSpriteManager = (
  scene: Scene,
  name: string,
  options: Partial<{
    capacity: number;
    cellSize: { width: number; height: number } | number;
    atlasUrl: string;
    atlasBlob?: Blob;
    epsilon?: number;
    samplingMode?: number;
    fromPacked?: boolean;
    spriteJSON?: any | null;
    options?: SpriteManagerOptions;
  }> = {}
): BabSpriteManager => {
  const managerMaybe = scene?.spriteManagers?.find((sm) => sm.name === name);
  if (isDefined(managerMaybe)) {
    return managerMaybe as BabSpriteManager;
  }
  const {
    capacity = 1,
    cellSize = 64,
    atlasUrl,
    atlasBlob,
    epsilon,
    samplingMode,
    fromPacked,
    spriteJSON,
    options: spriteManagerOptions,
  } = options;
  let objectUrl: string | undefined;
  try {
    if (atlasBlob) {
      objectUrl = URL.createObjectURL(atlasBlob);
    }
    const realizedUrl = isDefined(atlasUrl) ? atlasUrl : objectUrl;
    if (isUndefined(realizedUrl)) {
      throw new Error("altasUrl or atlasBlob is required", { cause: options });
    }
    return new SpriteManager(
      name,
      realizedUrl,
      capacity,
      cellSize,
      scene,
      epsilon,
      samplingMode,
      fromPacked,
      spriteJSON,
      spriteManagerOptions
    );
  } finally {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }
};
