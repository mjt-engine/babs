interface Frame {
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
interface AtlasJSON {
    frames: Record<string, Frame>;
}
interface BabylonSpriteMapFrame {
    filename: string;
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    rotated: boolean;
    trimmed: boolean;
    spriteSourceSize: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    sourceSize: {
        w: number;
        h: number;
    };
}
interface BabylonSpriteMapJSON {
    frames: BabylonSpriteMapFrame[];
}
export declare function createTextureAtlas({ baseUrl, imageNames, atlasSize, padding, }: {
    atlasSize: number;
    baseUrl: string;
    imageNames: string[];
    padding?: number;
}): Promise<{
    canvas: HTMLCanvasElement;
    atlasBlob: Blob;
    spritePackageManagerJson: AtlasJSON;
    babylonSpriteMapJson: BabylonSpriteMapJSON;
}>;
export {};
