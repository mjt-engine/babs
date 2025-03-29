import { Constants } from "@babylonjs/core/Engines/constants";
import { GlowLayer, } from "@babylonjs/core/Layers/glowLayer";
import { Color4 } from "@babylonjs/core/Maths/math.color";
export const addGlowLayer = (scene, name, options = {}) => {
    const gl = new GlowLayer(name, scene, options);
    gl.neutralColor = new Color4(0, 0, 0, 0);
    return gl;
};
export const Specials = {
    addGlowLayer,
    Constants,
};
//# sourceMappingURL=Specials.js.map