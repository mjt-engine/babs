import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Colors } from "@mjt-engine/color";


export const c4 = (color: string) => {
  const c = Colors.builder({ color });
  const result = Color4.FromHexString(c.hex());
  result.a = c.alpha();
  return result;
};
