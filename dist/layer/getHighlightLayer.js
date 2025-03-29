import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { isDefined } from "@mjt-engine/object";
export const getHighlightLayer = (scene, name, options) => {
    const layerMaybe = scene.getHighlightLayerByName(name);
    if (isDefined(layerMaybe)) {
        return layerMaybe;
    }
    return new HighlightLayer(name, scene, options);
};
//# sourceMappingURL=getHighlightLayer.js.map