interface PackOptions {
  atlasSize: number; // like 1024, 2048, etc.
  padding?: number;  // optional padding around each sprite
}

interface Frame {
  frame: { x: number; y: number; w: number; h: number };
}

interface AtlasJSON {
  frames: Record<string, Frame>;
}

export async function createTextureAtlas(
  baseUrl: string,           // base URL for images (can be relative or absolute)
  imageNames: string[],       // list of image names (no extension needed)
  options: PackOptions
): Promise<{ atlasBlob: Blob; jsonBlob: Blob }> {
  const { atlasSize, padding = 0 } = options;

  const canvas = document.createElement("canvas");
  canvas.width = atlasSize;
  canvas.height = atlasSize;
  const ctx = canvas.getContext("2d")!;

  const frames: Record<string, Frame> = {};

  let x = 0;
  let y = 0;
  let rowHeight = 0;

  for (const name of imageNames) {
    const filename = name.endsWith(".png") ? name : `${name}.png`;
    const img = await loadImage(`${baseUrl}/${filename}`);

    const spriteWidth = img.width + padding * 2;
    const spriteHeight = img.height + padding * 2;

    // If not enough room in this row, move to next row
    if (x + spriteWidth > atlasSize) {
      x = 0;
      y += rowHeight;
      rowHeight = 0;
    }

    // If overflow the canvas
    if (y + spriteHeight > atlasSize) {
      throw new Error(`Not enough space in atlas for image: ${filename}`);
    }

    // Draw with padding
    ctx.drawImage(img, x + padding, y + padding);

    frames[filename] = {
      frame: {
        x: x + padding,
        y: y + padding,
        w: img.width,
        h: img.height,
      },
    };

    x += spriteWidth;
    rowHeight = Math.max(rowHeight, spriteHeight);
  }

  // Export canvas as Blob
  const atlasBlob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png")
  );

  // Create JSON blob
  const jsonBlob = new Blob(
    [JSON.stringify({ frames }, null, 2)],
    { type: "application/json" }
  );

  return { atlasBlob, jsonBlob };
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
  });
}
