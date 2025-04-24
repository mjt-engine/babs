import { Constants } from "@babylonjs/core";
import { GlowLayer, type IGlowLayerOptions } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const addGlowLayer: (scene: Scene, name: string, options?: Partial<IGlowLayerOptions>) => GlowLayer;
export declare const Specials: {
    addGlowLayer: (scene: Scene, name: string, options?: Partial<IGlowLayerOptions>) => GlowLayer;
    Constants: typeof Constants;
};
