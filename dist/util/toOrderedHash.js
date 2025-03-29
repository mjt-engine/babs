import { Strings } from "@mjt-engine/string";
import { toOrderedString } from "./toOrderedString";
export const toOrderedHash = (obj) => {
    return Strings.hashFnv32a({ str: toOrderedString(obj) });
};
//# sourceMappingURL=toOrderedHash.js.map