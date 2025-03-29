import type { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Scene } from "@babylonjs/core/scene";
import { Colors } from "@mjt-engine/color";
import { iff } from "@mjt-engine/object";
import { c3 } from "../bab/c3";
import type { AllMaterialOptions } from "./Materials";

export const updateStandardMaterial = (
  scene: Scene,
  material: StandardMaterial,
  options: AllMaterialOptions
) => {
  const {
    alpha,
    diffuseTexture,
    emissiveTexture,
    ambientTexture,
    opacityTexture,
    diffuseColor,
    specularColor,
    ambientColor,
    emissiveColor,
  } = options;

  iff(diffuseTexture, (value) => {
    const texture = scene.getTextureByName(value);
    material.diffuseTexture = texture;
  });
  iff(emissiveTexture, (value) => {
    const texture = scene.getTextureByName(value);
    material.emissiveTexture = texture;
  });
  iff(ambientTexture, (value) => {
    const texture = scene.getTextureByName(value);
    material.ambientTexture = texture;
  });
  iff(opacityTexture, (value) => {
    const texture = scene.getTextureByName(value);
    material.opacityTexture = texture;
  });
  iff(diffuseColor, (value) => {
    material.diffuseColor = c3(value);
    const colorAlpha = Colors.from(value).alpha();
    if (colorAlpha < 1) {
      material.alpha = colorAlpha;
    }
  });
  iff(specularColor, (value) => {
    material.specularColor = c3(value);
  });
  iff(ambientColor, (value) => {
    material.ambientColor = c3(value);
  });
  iff(emissiveColor, (value) => {
    material.specularColor = c3(value);
  });

  iff(alpha, (value) => {
    material.alpha = value;
  });
};
