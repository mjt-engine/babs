import { isUndefined } from "@mjt-engine/object";
export const findClosestPick = (picks) => {
    if (isUndefined(picks)) {
        return undefined;
    }
    picks.sort((a, b) => {
        return a.distance - b.distance;
    });
    return picks[0];
};
//# sourceMappingURL=findClosestPick.js.map