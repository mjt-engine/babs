export declare const Voxels: {
    animateExplosion: (particle: import("@babylonjs/core").SolidParticle, options?: Partial<{
        random: import("@mjt-engine/random").NextRandom;
        radius: number;
        maxBounce: number;
        groundZ: number;
        speed: number;
        decay: number;
        dispose: () => void;
    }>) => void;
    voxDataToSps: (scene: import("@babylonjs/core").Scene, voxData: import("@mjt-engine/magica-voxels").VoxData, name: string) => import("@babylonjs/core").SolidParticleSystem;
    voxDataToMergedModel: (scene: import("@babylonjs/core").Scene, voxData: import("@mjt-engine/magica-voxels").VoxData, name: string) => import("@babylonjs/core").Mesh;
    voxDataToComplexModel: (scene: import("@babylonjs/core").Scene, voxData: import("@mjt-engine/magica-voxels").VoxData, name: string) => import("@babylonjs/core").Mesh;
};
