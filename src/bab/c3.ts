import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Colors } from "@mjt-engine/color";

export const c3 = (color: string) => {
  const hex = Colors.builder({ color }).hex();
  return Color3.FromHexString(hex);
};
