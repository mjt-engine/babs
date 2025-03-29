import { Textures } from "./Textures";

export const debugImage = (
  image: HTMLCanvasElement | HTMLImageElement,
  label = "DEBUG IMAGE"
) => {
  // const canvas = document.createElement("canvas");
  const canvas = Textures.copyToCanvas(image, 1024, 1024);
  // canvas.style.position = "absolute";
  // canvas.style.left = "0";
  // canvas.style.top = "0";
  canvas.style.border = "1px solid grey";
  const labelElement = document.createElement("div");
  labelElement.textContent = label;

  document.body.appendChild(labelElement);
  document.body.appendChild(canvas);
  return new Promise((resolve, reject) => {
    const onclick = () => {
      canvas.remove();
      labelElement.remove();
      resolve(undefined);
    };
    canvas.onclick = onclick;
    labelElement.onclick = onclick;
  });
};
