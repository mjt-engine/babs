interface Frame {
  frame: { x: number; y: number; w: number; h: number };
}

interface AtlasJSON {
  frames: Record<string, Frame>;
}

interface BabylonSpriteMapFrame {
  filename: string;
  frame: { x: number; y: number; w: number; h: number };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
}

interface BabylonSpriteMapJSON {
  frames: BabylonSpriteMapFrame[];
}

export async function createTextureAtlas({
  baseUrl,
  imageNames,
  atlasSize,
  padding = 0,
}: {
  atlasSize: number;
  baseUrl: string;
  imageNames: string[];
  padding?: number;
}): Promise<{
  canvas: HTMLCanvasElement;
  atlasBlob: Blob;
  spritePackageManagerJson: AtlasJSON;
  babylonSpriteMapJson: BabylonSpriteMapJSON;
}> {
  const canvas = document.createElement("canvas");
  canvas.width = atlasSize;
  canvas.height = atlasSize;
  const ctx = canvas.getContext("2d")!;

  const simpleFrames: Record<string, Frame> = {};
  const babylonFrames: BabylonSpriteMapFrame[] = [];

  let x = 0;
  let y = 0;
  let rowHeight = 0;

  for (const name of imageNames) {
    const filename = name.endsWith(".png") ? name : `${name}.png`;
    const img = await loadImage(`${baseUrl}/${filename}`);

    const spriteWidth = img.width + padding * 2;
    const spriteHeight = img.height + padding * 2;

    if (x + spriteWidth > atlasSize) {
      x = 0;
      y += rowHeight;
      rowHeight = 0;
    }

    if (y + spriteHeight > atlasSize) {
      throw new Error(`Not enough space in atlas for image: ${filename}`);
    }

    ctx.drawImage(img, x + padding, y + padding);

    simpleFrames[filename] = {
      frame: {
        x: x + padding,
        y: y + padding,
        w: img.width,
        h: img.height,
      },
    };

    babylonFrames.push({
      filename,
      frame: {
        x: x + padding,
        y: y + padding,
        w: img.width,
        h: img.height,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: img.width, h: img.height },
      sourceSize: { w: img.width, h: img.height },
    });

    x += spriteWidth;
    rowHeight = Math.max(rowHeight, spriteHeight);
  }

  const atlasBlob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png")
  );

  return {
    canvas,
    atlasBlob,
    spritePackageManagerJson: { frames: simpleFrames },
    babylonSpriteMapJson: { frames: babylonFrames },
  };
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
  });
}
