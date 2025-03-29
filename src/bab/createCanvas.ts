
export const createCanvas = ({
  width = 320, height = 320,
}: {
  width: number;
  height: number;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};
