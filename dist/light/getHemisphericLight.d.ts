import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import type { Scene } from "@babylonjs/core/scene";
import type { HemisphericLightOptions } from "./Lights";
export declare const getHemisphericLight: (scene: Scene, name: string, options?: HemisphericLightOptions) => HemisphericLight;
