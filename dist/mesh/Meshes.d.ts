export declare const Meshes: {
    lookAt: (from: import("@mjt-engine/math").Point2, to: import("@mjt-engine/math").Point2) => number;
    getBox: (scene: import("@babylonjs/core").Scene, name: string, options?: import("./updateMesh").MeshOptions & import("./getBox").BoxOptions) => import("@babylonjs/core").Mesh;
    describeMesh: (mesh: import("@babylonjs/core").AbstractMesh, search?: RegExp, depth?: number) => void;
    getPlane: (scene: import("@babylonjs/core").Scene, name: string, options?: import("./updateMesh").MeshOptions & Partial<{
        width: number;
        height: number;
        tag: string | string[];
        billboard: boolean;
        doubleSided: boolean;
    }>) => import("@babylonjs/core").Mesh;
    getBoxInstance: (scene: import("@babylonjs/core").Scene, name: string, options: import("./updateMesh").MeshOptions & Partial<{
        width: number;
        height: number;
        depth: number;
        receiveShadows: boolean;
    }>) => import("@babylonjs/core").InstancedMesh;
    getSphere: (scene: import("@babylonjs/core").Scene, name: string, options: import("./updateMesh").MeshOptions & Partial<{
        radius: number;
    }>) => import("@babylonjs/core").Mesh;
    getCylinder: (scene: import("@babylonjs/core").Scene, name: string, options?: import("./updateMesh").MeshOptions & Partial<{
        height: number;
        arc: number;
        radius: number;
        tag: string | string[];
    }>) => import("@babylonjs/core").Mesh;
    getTorusKnot: (scene: import("@babylonjs/core").Scene, name: string, options?: import("./updateMesh").MeshOptions & Partial<{
        radius: number;
        material: string;
    }>) => import("@babylonjs/core").Mesh;
    getLine: (scene: import("@babylonjs/core").Scene, name: string, options: import("./updateMesh").MeshOptions & Partial<{
        points: import("@mjt-engine/math").Point3[];
        colors: string[];
        updatable: boolean;
        useVertexAlpha: boolean;
    }>) => import("@babylonjs/core").LinesMesh;
    walkMeshes: (mesh: import("@babylonjs/core").AbstractMesh | import("@babylonjs/core").Scene, walker: (mesh: import("@babylonjs/core").AbstractMesh) => void) => void;
    pickMesh: (scene: import("@babylonjs/core").Scene, x: number, y: number, options?: Partial<{
        camera: import("@babylonjs/core").Camera;
        predicate: (mesh: import("@babylonjs/core").AbstractMesh) => boolean;
    }>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").AbstractMesh> | undefined;
    getMesh: <T extends import("@babylonjs/core").Mesh | import("@babylonjs/core").InstancedMesh>(scene: import("@babylonjs/core").Scene, name: string, producer: (instance?: T) => T, updatable?: boolean) => T;
    getMeshAsync: <T extends import("@babylonjs/core").Mesh | import("@babylonjs/core").InstancedMesh>(scene: import("@babylonjs/core").Scene, name: string, producer: () => Promise<T>) => Promise<T>;
    calcTopOfMeshWorldPosition: (mesh: import("@babylonjs/core").AbstractMesh) => import("@mjt-engine/math").Point3;
    mergeMeshes: (meshes: import("@babylonjs/core").Mesh[], options?: Partial<{
        disposeSource: boolean;
        allow32BitsIndices: boolean;
        meshSubclass: import("@babylonjs/core").Mesh;
        subdivideWithSubMeshes: boolean;
        multiMultiMaterials: boolean;
    }>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").Mesh>;
    getVoxModel: (scene: import("@babylonjs/core").Scene, name: string, src: string, options?: import("./updateMesh").MeshOptions & Partial<{
        merged: boolean;
    }>) => import("@babylonjs/core").SolidParticleSystem;
    calcClientRectForMesh: (mesh: import("@babylonjs/core").AbstractMesh) => {
        width: number;
        height: number;
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    updateArcRotateCameraPosition: (camera: import("@babylonjs/core").ArcRotateCamera, position: import("@mjt-engine/math").Point3) => void;
    findClosestPick: (picks: import("@babylonjs/core").PickingInfo[]) => import("@babylonjs/core").PickingInfo | undefined;
    destroyMesh: (scene: import("@babylonjs/core").Scene, name: string, options?: Partial<{
        recurse: boolean;
        disposeMaterials: boolean;
        disposeTextures: boolean;
    }>) => void;
    getMeshInstance: <T extends import("@babylonjs/core").Mesh>(scene: import("@babylonjs/core").Scene, name: string, rootName: string, producer: () => T) => import("@babylonjs/core").InstancedMesh;
    getMeshInstanceAsync: <T extends import("@babylonjs/core").Mesh>(scene: import("@babylonjs/core").Scene, name: string, rootName: string, producer: () => Promise<T>) => Promise<import("@babylonjs/core").InstancedMesh>;
    isInstancedMesh: (mesh: import("@babylonjs/core").AbstractMesh) => mesh is import("@babylonjs/core").InstancedMesh;
    pickMeshes: (scene: import("@babylonjs/core").Scene, x: number, y: number, options?: Partial<{
        camera: import("@babylonjs/core").Camera;
        predicate: (mesh: import("@babylonjs/core").AbstractMesh) => boolean;
    }>) => import("@babylonjs/core").Nullable<import("@babylonjs/core").PickingInfo[]>;
    getPolyhedron: (scene: import("@babylonjs/core").Scene, name: string, options?: import("./updateMesh").MeshOptions & Partial<{
        size: number;
        type: keyof typeof import("./getPolyhedron").BabPolyMap;
        material: string;
    }>) => import("@babylonjs/core").Mesh;
    updateMesh: (scene: import("@babylonjs/core").Scene, mesh: import("@babylonjs/core").Mesh | import("@babylonjs/core").InstancedMesh, options: import("./updateMesh").MeshOptions) => void;
};
