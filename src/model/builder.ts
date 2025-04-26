import { isDefined, isUndefined } from "@mjt-engine/object";
import { Randoms } from "@mjt-engine/random";
import { c3 } from "../bab/c3";
import { c4 } from "../bab/c4";
import { createWebGlEngine } from "../engine/createWebglEngine";
import { renderOnce } from "../scene/renderOnce";
import { v3 } from "../bab/v3";
import { attachArcRotateCameraControls } from "../camera/attachArcRotateCameraControls";
import { attachUniversalCameraControls } from "../camera/attachUniversalCameraControls";
import { describeMesh } from "../mesh/describeMesh";
import { imageToTexture } from "../texture/imageToTexture";
import type { ModelBuilder, ModelPath, MorphRemaps } from "./ModelBuilder";
import { addDefaultLightsToScene } from "./addDefaultLightsToScene";
import { loadDazFigure } from "./loadDazFigure";
import { meshFixer } from "./meshFixer";
import { performMorph } from "./performMorph";
import { pickMesh } from "./pickMesh";
import { totalBoundingInfo } from "./totalBoundingInfo";
import { updateColor } from "./updateColor";
import { updateTranslucency } from "./updateTranslucency";
import { Scene } from "@babylonjs/core";
import { ImageProcessingConfiguration } from "@babylonjs/core/Materials/imageProcessingConfiguration";
import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { MeshBuilder } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Mesh } from "@babylonjs/core";

export const builder = async (
  props: {
    scene?: Scene;
    path?: ModelPath;
    exposure?: number;
    toneMappingEnabled?: boolean;
    addDefaultLights?: boolean;
    clearColor?: string;
  } = {}
): Promise<ModelBuilder> => {
  const {
    path = [],
    exposure = 1.6,
    toneMappingEnabled = true,
    addDefaultLights = false,
    clearColor = "grey",
    scene = new Scene(createWebGlEngine()),
  } = props;
  const paths = Array.isArray(path) ? path : [path];
  await Promise.all(
    paths.map(async (path) => {
      await loadDazFigure({ scene, path });
    })
  );
  // scene.clearColor = c4(clearColor);
  // scene.autoClear = true;

  scene.imageProcessingConfiguration.exposure = exposure;
  scene.imageProcessingConfiguration.toneMappingEnabled = toneMappingEnabled;
  scene.imageProcessingConfiguration.toneMappingType =
    ImageProcessingConfiguration.TONEMAPPING_ACES;

  const highlightLayer = new HighlightLayer("highlightLayer", scene);

  // const camera = new UniversalCamera("camera1", v3(0, 1, 1), scene);
  // scene.activeCamera = camera;
  if (addDefaultLights) {
    addDefaultLightsToScene(scene);
  }
  // camera.minZ = 0;
  const STATE = {
    lock: undefined as string | undefined,
    remaps: {} as MorphRemaps,
  };

  const b: ModelBuilder = {
    addTestCube: () => {
      const testCube = MeshBuilder.CreateBox("testCube");
      testCube.material = new StandardMaterial("testCube");
      testCube.material.wireframe = true;
      scene.addMesh(testCube);
      return b;
    },
    render: () => {
      scene.render();
      return b;
    },
    lock: (id = Randoms.randomUuid()) => {
      if (isDefined(STATE.lock) && STATE.lock !== id) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(b.lock(id));
          }, 1);
        });
      }
      STATE.lock = id;
      return Promise.resolve(id);
    },
    unlock: (id) => {
      if (STATE.lock !== id) {
        console.log({ STATE, id });
        throw new Error("Unable to unlock with wrong lock id");
      }
      STATE.lock = undefined;
      return b;
    },
    camera: (x, y, z) => {
      if (!scene.activeCamera) {
        throw new Error("no activeCamera in scene", { cause: scene });
      }
      scene.activeCamera.position = v3(x, y, z);
      return b;
    },
    lookAt: (x, y, z) => {
      const camera = scene.activeCamera as FreeCamera;
      camera.setTarget(v3(x, y, z));
      return b;
    },
    startRenderLoop: () => {
      scene.getEngine().runRenderLoop(() => {
        scene.render();
      });
      return b;
    },
    attachControls: () => {
      if (scene.activeCamera instanceof UniversalCamera) {
        attachUniversalCameraControls(scene.activeCamera);
      }
      if (scene.activeCamera instanceof ArcRotateCamera) {
        attachArcRotateCameraControls(scene.activeCamera);
      }
      return b;
    },
    takeCanvas: async (
      // const engine = scene.getEngine()
      width = scene?.getEngine()?.getRenderingCanvas()?.width ?? 256,
      height = scene?.getEngine()?.getRenderingCanvas()?.height ?? 256
    ) => {
      const canvas = scene.getEngine().getRenderingCanvas();
      if (!canvas) {
        throw new Error("No canvas for engine", { cause: scene });
      }
      canvas.width = width;
      canvas.height = height;
      await renderOnce(scene);
      const result = document.createElement("canvas");
      result.width = canvas.width;
      result.height = canvas.height;
      result.getContext("2d")!.drawImage(canvas, 0, 0);
      return result;
    },
    reset: () => {
      b.camera(0, 1, 2.5);
      b.lookAt(0, 1, 0);

      return b;
    },
    describe: (what = "meshmorphcamlightanim", search = /.*/) => {
      what = what.toLocaleLowerCase();

      if (what.includes("anim")) {
        console.log("--START Animations ---");
        scene.animationGroups.forEach((animationGroup) => {
          console.log({ animationGroup });
        });
        console.log("--END Animations ---");
      }

      if (what.includes("morph")) {
        console.log("--START MORPH TARGETS---");
        const result = new Set<string>();
        scene.morphTargetManagers.map((manager) => {
          for (let i = 0; i < manager.numTargets; i++) {
            const target = manager.getTarget(i);
            if (search.test(target.name)) {
              result.add(target.name);
            }
          }
        });
        result.forEach((name) => console.log(name));
        console.log("--END MORPH TARGETS---");
      }
      if (what.includes("mesh")) {
        console.log("--START MESHEs---");
        scene.meshes.forEach((mesh) => describeMesh(mesh, search));
        console.log("--END MESHES---");
      }
      if (what.includes("cam")) {
        console.log("--START CAMERAS---");
        scene.cameras.forEach((camera) => console.log({ camera }));
        console.log("--END CAMERAS---");
      }
      if (what.includes("light")) {
        console.log("--START LIGHTS---");
        scene.lights.forEach((light) => console.log({ light }));
        console.log("--END LIGHTS---");
      }
      return b;
    },
    updateColor: (color, textureMatcher = /.*/, meshMatcher = /.*/) => {
      scene.meshes.forEach((mesh) =>
        updateColor({ color, mesh, meshMatcher, textureMatcher })
      );
      return b;
    },
    updateTranslucency: (value, textureMatcher = /.*/, meshMatcher = /.*/) => {
      // scene.enableSubSurfaceForPrePass().metersPerUnit = 0.4;
      // scene.prePassRenderer.samples = 2;
      scene.meshes.forEach((mesh) =>
        updateTranslucency({ value, mesh, meshMatcher, textureMatcher })
      );
      return b;
    },
    gotoFrame: (frame) => {
      return new Promise((resolve, reject) => {
        const anim = scene.getAnimationGroupByName("Animation");
        if (!anim) {
          throw new Error("No animation group", { cause: scene });
        }
        anim.stop();
        anim.start(false, 0.1, frame / 30, frame / 30);
        anim.onAnimationEndObservable.addOnce(() => {
          resolve();
        });
      });
    },
    morph: (influences) => {
      performMorph(scene, influences, STATE.remaps);
      return b;
    },
    fix: (mapper) => {
      scene.meshes.forEach((mesh) => meshFixer(mesh, mapper));
      return b;
    },
    fixMesh: (mesh, mapper) => {
      meshFixer(mesh, mapper);
      return b;
    },
    fixMaterial: (mesh, mapper) => {
      meshFixer(mesh, (me) => {
        if (mesh.material instanceof PBRMaterial) {
          mesh.material = mapper(mesh.material);
        }
        return me;
      });
      return b;
    },
    fixTexture: (material, mapper) => {
      material.getActiveTextures().map((tex) => {
        mapper(tex as Texture);
      });
      return b;
    },
    color3: c3,
    color4: c4,
    createTexture: async (image, name = `texture-${Randoms.randomUuid()}`) => {
      return imageToTexture(scene, name, image);
    },
    append: async (path, name) => {
      const paths = Array.isArray(path) ? path : [path];
      await Promise.all(
        paths.map(async (path) => {
          await loadDazFigure({ scene, path, name });
        })
      );
      return b;
    },
    getMorphs: (search = /.*/) => {
      const result = new Set<string>();
      scene.morphTargetManagers.map((manager) => {
        for (let i = 0; i < manager.numTargets; i++) {
          const target = manager.getTarget(i);
          if (search.test(target.name)) {
            result.add(target.name);
          }
        }
      });

      return Array.from(result);
    },
    getModelNames: () => {
      // TODO better way to isolate top-level model meshes in scene
      return scene.meshes.map((m) => m.name).filter((n) => n.endsWith(".glb"));
    },
    addMorphRemaps: (remaps) => {
      STATE.remaps = { ...STATE.remaps, ...remaps };
      return b;
    },
    setClearColor: (color) => {
      scene.clearColor = c4(color);
      return b;
    },
    setRotation: (model, rotation) => {
      const mesh = scene.meshes.find((m) => m.name === model);
      if (isUndefined(mesh)) {
        return b;
      }
      mesh.rotation = v3(0, rotation, 0);
      return b;
    },
    getBBox: (model) => {
      const mesh = scene.getMeshByName(model);
      if (!mesh) {
        throw new Error(`no mesh in scene by name: ${model}`, { cause: scene });
      }
      return totalBoundingInfo(mesh.getChildMeshes()).boundingBox;
    },
    wireframe: () => {
      scene.meshes.forEach((mesh) => {
        if (isUndefined(mesh.material)) {
          mesh.material = new StandardMaterial(`mat-${mesh.name}`, scene);
        }
        if (!mesh.material) {
          throw new Error("no material on mesh", { cause: mesh });
        }
        mesh.material.wireframe = true;
      });
      return b;
    },
    pickMesh: (x, y, predicate) => {
      return pickMesh(scene, x, y, { predicate });
    },
    highlight: (mesh, color) => {
      if (mesh instanceof Mesh) {
        highlightLayer.addMesh(mesh, c3(color));
      }
      return b;
    },
    unHighlight: (mesh) => {
      if (isUndefined(mesh)) {
        highlightLayer.removeAllMeshes();
        return b;
      }
      if (mesh instanceof Mesh) {
        highlightLayer.removeMesh(mesh);
      }
      return b;
    },
  };
  // b.reset();
  return b;
};
