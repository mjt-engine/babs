import { Constants } from "@babylonjs/core/Engines/constants";
import { GlowLayer, type IGlowLayerOptions } from "@babylonjs/core/Layers/glowLayer";
import type { Scene } from "@babylonjs/core/scene";
export declare const addGlowLayer: (scene: Scene, name: string, options?: Partial<IGlowLayerOptions>) => GlowLayer;
export declare const Specials: {
    addGlowLayer: (scene: Scene, name: string, options?: Partial<IGlowLayerOptions>) => GlowLayer;
    Constants: typeof Constants;
};
