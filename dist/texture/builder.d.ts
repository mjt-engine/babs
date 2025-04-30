import type { TextureLayer } from "./TextureLayer";
export declare const builder: ({ size }?: {
    size: number;
}) => TextureBuilder;
export type TextureBuilder = {
    addLayer: (layer: TextureLayer) => TextureBuilder;
    render: () => Promise<HTMLCanvasElement | OffscreenCanvas>;
    clear: () => TextureBuilder;
};
