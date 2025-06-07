export declare const Wxrs: {
    createWebXrSessionManager: (scene: import("@babylonjs/core").Scene) => import("..").BabWebXRSessionManager;
    helloXrWorld: (engine?: import("..").BabEngine) => Promise<{
        scene: import("@babylonjs/core").Scene;
        xr: Promise<import("@babylonjs/core").WebXRDefaultExperience>;
    }>;
    createDefaultEnvironment: (scene: import("@babylonjs/core").Scene) => import("./WxrsTypes").BabEnvironmentHelper;
    createWebXrExperience: (scene: import("@babylonjs/core").Scene, options?: import("./WxrsTypes").BabWebXRDefaultExperienceOptions) => Promise<import("@babylonjs/core").WebXRDefaultExperience>;
};
