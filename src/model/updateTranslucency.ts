import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { AbstractMesh } from "@babylonjs/core";
import { isDefined } from "@mjt-engine/object";

export const updateTranslucency = (props: UpdateTranslucencyProps) => {
  const { mesh, value, textureMatcher = /.*/, meshMatcher = /.*/ } = props;
  const textures = mesh?.material?.getActiveTextures() ?? [];
  if (
    isDefined(
      textures.find((t) => {
        const texName = t?.name;
        return textureMatcher.test(texName);
      })
    )
  ) {
    const material = mesh.material;
    if (material instanceof PBRMaterial) {
      // material.albedoColor = c3(color);
      // material.metallic = 0;
      // material.roughness = 0.16;
      // material.subSurface.maximumThickness = 0.1;
      // material.subSurface.isTranslucencyEnabled = true;
      // material.subSurface.isRefractionEnabled = true;
      // material.subSurface.translucencyIntensity = 10;
      // material.subSurface.tintColor = Color3.Red();
      // material.subSurface.scatteringDiffusionProfile = new Color3(
      //   0.75,
      //   0.25,
      //   0.2
      // );
      // material.subSurface.useThicknessAsDepth = true
      // material.subSurface.translucencyIntensity = value
      // material.subSurface.isScatteringEnabled = true;
    }
  }

  mesh.getChildMeshes().map((mesh) => updateTranslucency({ ...props, mesh }));
};

export type UpdateTranslucencyProps = {
  mesh: AbstractMesh;
  value: number;
  textureMatcher: RegExp;
  meshMatcher: RegExp;
};
