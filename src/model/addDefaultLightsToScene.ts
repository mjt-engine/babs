import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import type { Scene } from "@babylonjs/core/scene";
import { Colors } from "@mjt-engine/color";
import { c3 } from "../bab/c3";
import { v3 } from "../bab/v3";

export const addDefaultLightsToScene = (scene: Scene) => {
  {
    const light = new HemisphericLight("hemi", v3(), scene);
    light.intensity = 0.3;
  }

  // back
  {
    const light = new PointLight("backlight", v3(), scene);
    light.position = v3(0, 2, -3);
    light.intensity = 1;
  }
  // left
  {
    const light = new PointLight("leftlight", v3(), scene);
    light.position = v3(1, 1.5, 1);
    light.diffuse = c3(
      Colors.builder({ color: "red" }).lighten(0.8).toString()
    );
    light.intensity = 3;
  }
  // right
  {
    const light = new PointLight("rightlight", v3(), scene);
    light.position = v3(-1, 2, 1);
    light.diffuse = c3(
      Colors.builder({ color: "blue" }).lighten(0.8).toString()
    );
    light.intensity = 1;
  }
  // front
  // {
  //   const light = new PointLight("frontlight", v3(), scene);
  //   light.position = v3(0, 1.5, 1);
  //   // light.diffuse = c3(Colors.builder({ color: "red" }).lighten(1).toString());
  //   light.intensity = 0.5;
  // }
};
