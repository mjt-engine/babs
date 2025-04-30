import type { Vec3 } from "@mjt-engine/math";
export type LightOptions = Partial<{
    intensity: number;
}>;
export type HemisphericLightOptions = Partial<LightOptions & {
    direction: Vec3;
}>;
export type PointLightOptions = Partial<LightOptions & {
    position: Vec3;
}>;
export type AllLightOptions = LightOptions & HemisphericLightOptions & PointLightOptions;
export declare const Lights: {
    getLight: <T extends import("@babylonjs/core").Light>(scene: import("@babylonjs/core").Scene, name: string, producer: () => T) => T;
    getHemisphericLight: (scene: import("@babylonjs/core").Scene, name: string, options?: HemisphericLightOptions) => import("@babylonjs/core").HemisphericLight;
    getPointLight: (scene: import("@babylonjs/core").Scene, name: string, options?: PointLightOptions) => import("@babylonjs/core").PointLight;
    updateLight: (light: import("@babylonjs/core").Light, options: AllLightOptions) => void;
};
