import { Engine } from "@babylonjs/core/Engines/engine";
import { createCanvas } from "./createCanvas";
export const createEngine = (options = {}) => {
    const { width = 320, height = 320, antialias, canvas = createCanvas({ width, height }), } = options;
    const engine = new Engine(canvas, antialias, {
        powerPreference: "high-performance",
        ...options,
    });
    // engine.loadingScreen = undefined!;
    engine.hideLoadingUI();
    return engine;
};
//# sourceMappingURL=createEngine.js.map