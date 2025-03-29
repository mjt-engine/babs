import type { IHighlightLayerOptions } from "@babylonjs/core/Layers/highlightLayer";
import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import type { Scene } from "@babylonjs/core/scene";
export declare const getHighlightLayer: <T extends HighlightLayer>(scene: Scene, name: string, options?: IHighlightLayerOptions) => HighlightLayer;
