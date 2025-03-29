import { SceneLoader, } from "@babylonjs/core/Loading/sceneLoader";
import { GLTF2 } from "@babylonjs/loaders/glTF";
export const loadAssetContainer = (scene, path, options = {}) => {
    const { onProgress = () => { } } = options;
    const engine = scene.getEngine();
    engine.hideLoadingUI();
    return new Promise((resolve, reject) => {
        try {
            GLTF2.GLTFLoader; // fucking loader 'magic'
            SceneLoader.ShowLoadingScreen = false;
            SceneLoader.LoadAssetContainer("", path, scene, (assets) => {
                resolve(assets);
            }, (progress) => {
                return onProgress(progress);
            }, (scene, message, reason) => {
                console.log({ path, scene, message, reason });
                reject(reason);
            });
        }
        catch (reason) {
            reject(reason);
        }
    });
};
//# sourceMappingURL=loadAssetContainer.js.map