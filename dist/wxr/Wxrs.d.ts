import { EnvironmentHelper, WebXRDefaultExperienceOptions } from "@babylonjs/core";
export type BabEnvironmentHelper = EnvironmentHelper;
export type BabWebXRDefaultExperienceOptions = WebXRDefaultExperienceOptions;
export declare const Wxrs: {
    createWebXrSessionManager: (scene: import("@babylonjs/core").Scene) => import("..").BabWebXRSessionManager;
    helloXrWorld: (engine?: import("..").BabEngine) => Promise<{
        scene: import("@babylonjs/core").Scene;
        xr: Promise<import("@babylonjs/core").WebXRDefaultExperience>;
    }>;
    createDefaultEnvironment: (scene: import("@babylonjs/core").Scene) => BabEnvironmentHelper;
    createWebXrExperience: (scene: import("@babylonjs/core").Scene, options?: BabWebXRDefaultExperienceOptions) => Promise<import("@babylonjs/core").WebXRDefaultExperience>;
};
