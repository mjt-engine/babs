import { Images } from "@mjt-engine/image";
import { stopwatch } from "./Timers";
export const imageSrcToUrl = async (src) => {
    const sw = stopwatch("imageSrcToUrl");
    if (typeof src === "string") {
        sw();
        return src;
    }
    // const flipped = await createImageBitmap(src, {
    //   imageOrientation: "flipY",
    // });
    const cvs = document.createElement("canvas");
    cvs.width = src.width;
    cvs.height = src.height;
    cvs.getContext("2d").drawImage(src, 0, 0);
    const result = await Images.toSrcString(cvs);
    sw();
    return result;
};
//# sourceMappingURL=imageSrcToUrl.js.map