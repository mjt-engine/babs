import type { IHighlightLayerOptions } from "@babylonjs/core";
import { HighlightLayer } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
export declare const getHighlightLayer: <T extends HighlightLayer>(scene: Scene, name: string, options?: IHighlightLayerOptions) => HighlightLayer;
