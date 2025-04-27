interface PackOptions {
    atlasSize: number;
    padding?: number;
}
export declare function createTextureAtlas(baseUrl: string, // base URL for images (can be relative or absolute)
imageNames: string[], // list of image names (no extension needed)
options: PackOptions): Promise<{
    atlasBlob: Blob;
    jsonBlob: Blob;
}>;
export {};
