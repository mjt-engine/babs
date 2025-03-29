import { Strings } from "@mjt-engine/string";
import { toOrderedString } from "./toOrderedString";

export const toOrderedHash = (obj: object) => {
  return Strings.hashFnv32a({ str: toOrderedString(obj) });
};
