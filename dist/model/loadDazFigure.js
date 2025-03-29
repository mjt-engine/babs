import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GLTF2 } from "@babylonjs/loaders/glTF";
import { fixDazFigure } from "./fix/fixDazFigure";
export const loadDazFigure = (props) => {
    const { path, scene, name = path instanceof File ? path.name : path } = props;
    const engine = scene.getEngine();
    engine.hideLoadingUI();
    return new Promise((resolve, reject) => {
        try {
            GLTF2.GLTFLoader; // fucking loader 'magic'
            SceneLoader.ShowLoadingScreen = false;
            SceneLoader.Append("", path, scene, (loadedScene) => {
                const rootMesh = loadedScene.getMeshByName("__root__");
                if (!rootMesh) {
                    throw new Error("No root mesh found", { cause: loadedScene });
                }
                rootMesh.name = name;
                if (loadedScene.cameras.length > 0) {
                    loadedScene.activeCamera = loadedScene.cameras[0];
                }
                loadedScene.animationGroups.forEach((anim) => {
                    anim.stop();
                });
                fixDazFigure(loadedScene);
                resolve(rootMesh);
            }, (progress) => { }, (scene, message, reason) => {
                console.log({ path, scene, message, reason });
                reject(reason);
            });
        }
        catch (reason) {
            reject(reason);
        }
    });
};
//# sourceMappingURL=loadDazFigure.js.map