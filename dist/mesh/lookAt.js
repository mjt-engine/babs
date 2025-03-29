import { Maths, toVec2 } from "@mjt-engine/math";
export const lookAt = (from, to) => {
    const [x, y] = toVec2(Maths.normalize2(Maths.subtract2(to, from)));
    return Math.atan2(y, x) + Math.PI / 2;
};
//# sourceMappingURL=lookAt.js.map