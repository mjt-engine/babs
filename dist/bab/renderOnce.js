import { stopwatch } from "../util/Timers";
export const renderOnce = (scene) => {
    const sw = stopwatch(`renderOnce`);
    return new Promise((resolve, reject) => {
        try {
            scene.onAfterRenderCameraObservable.addOnce(() => {
                sw();
                resolve();
            });
            scene.render(true);
        }
        catch (reason) {
            reject(reason);
        }
    });
};
//# sourceMappingURL=renderOnce.js.map