import { Scene } from "@babylonjs/core/scene";
import { layerToPlane } from "./layerToPlane";
export const imageLayersToScene = async (layers, engine) => {
    const scene = new Scene(engine);
    const planes = await Promise.all(layers.map(async (image, index) => {
        const plane = await layerToPlane(image, scene);
        plane.position.set(0, 0, -index);
        return plane;
    }));
    return scene;
};
//# sourceMappingURL=imageLayersToScene.js.map