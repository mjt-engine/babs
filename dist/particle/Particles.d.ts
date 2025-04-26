export declare const Particles: {
    getSolidParticleSystem: (scene: import("@babylonjs/core").Scene, name: string, options: ConstructorParameters<typeof import("@babylonjs/core").SolidParticleSystem>[2]) => import("@babylonjs/core").SolidParticleSystem;
    getParticleSystem: <T extends import("..").BabParticleSystem>(scene: import("@babylonjs/core").Scene, name: string, producer: () => T) => T;
    buildSpsFromSchadowScene: ({ sps, shadowScene, liveScene, }: {
        sps: import("@babylonjs/core").SolidParticleSystem;
        shadowScene: import("@babylonjs/core").Scene;
        liveScene: import("@babylonjs/core").Scene;
    }) => void;
};
