export const copyToCanvas = (image, width = image.width, height = image.height) => {
    const copy = document.createElement("canvas");
    copy.width = width;
    copy.height = height;
    copy
        .getContext("2d")
        .drawImage(image, 0, 0, image.width, image.height, 0, 0, copy.width, copy.height);
    return copy;
};
//# sourceMappingURL=copyToCanvas.js.map