import { Sprite } from "@babylonjs/core/Sprites/sprite";
import { SpriteManager } from "@babylonjs/core/Sprites/spriteManager";
import { assertValue } from "@mjt-engine/assert/dist/assertValue";
import { isDefined } from "@mjt-engine/object";
export const getSpriteManager = (scene, name, options = {}) => {
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
export const getSprite = (scene, name, spriteManagerName) => {
    const spriteManager = assertValue(getSpriteManager(scene, spriteManagerName));
    const spriteMaybe = spriteManager?.sprites?.find((s) => s.name === name);
    if (isDefined(spriteMaybe)) {
        return spriteMaybe;
    }
    return new Sprite(name, spriteManager);
};
export const Sprites = { getSpriteManager, getSprite };
//# sourceMappingURL=Sprites.js.map