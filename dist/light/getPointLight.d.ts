import type { Scene } from "@babylonjs/core/scene";
import type { PointLightOptions } from "./Lights";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
export declare const getPointLight: (scene: Scene, name: string, options?: PointLightOptions) => PointLight;
