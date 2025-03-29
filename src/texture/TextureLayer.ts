import type { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { ModelMesh, ModelTexture } from "../model/ModelBuilder";
import type { TextureImageSrc } from "./TextureImageSrc";

export type TextureLayer = Partial<{
  image: TextureImageSrc;
  color: string;
  size: number;
  _texture: ModelTexture;
  _mesh: ModelMesh;
  _material: StandardMaterial;
  _cached: boolean;
}>;
