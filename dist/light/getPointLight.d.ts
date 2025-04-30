import type { Scene } from "@babylonjs/core";
import type { PointLightOptions } from "./Lights";
import { PointLight } from "@babylonjs/core";
export declare const getPointLight: (scene: Scene, name: string, options?: PointLightOptions) => PointLight;
