export declare const Models: {
    renderOnce: (scene: import("@babylonjs/core").Scene) => Promise<void>;
    loadDazFigure: (props: {
        path: string | File;
        scene: import("@babylonjs/core").Scene;
        name?: string;
    }) => Promise<import("@babylonjs/core").AbstractMesh>;
};
