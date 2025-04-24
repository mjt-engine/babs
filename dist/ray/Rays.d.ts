export declare const Rays: {
    createRay: (origin: import("@mjt-engine/math").Point3, direction: import("@mjt-engine/math").Point3, length?: number) => import("@babylonjs/core").Ray;
    pickWithRay: (scene: import("@babylonjs/core").Scene, ray: import("@babylonjs/core").Ray, options?: Partial<{
        predicate: (mesh: import("@babylonjs/core").AbstractMesh) => boolean;
        fastCheck: boolean;
        trianglePredicate: import("@babylonjs/core").TrianglePickingPredicate;
    }>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").PickingInfo>;
};
