import type { BoundingBox } from "@babylonjs/core/Culling/boundingBox";
import type { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Nullable } from "@babylonjs/core/types";

export type ModelPath = string | File | string[] | File[];

export type ModelBuilder = {
  lock: (id?: string) => Promise<string>;
  unlock: (id: string) => ModelBuilder;
  camera: (x: number, y: number, z: number) => ModelBuilder;
  lookAt: (x: number, y: number, z: number) => ModelBuilder;
  takeCanvas: (width?: number, height?: number) => Promise<HTMLCanvasElement>;
  attachControls: () => ModelBuilder;
  startRenderLoop: () => ModelBuilder;
  reset: () => ModelBuilder;
  describe: (what?: string, search?: RegExp) => ModelBuilder;
  updateColor: (color: string, texture?: RegExp, mesh?: RegExp) => ModelBuilder;
  updateTranslucency: (
    value: number,
    texture?: RegExp,
    mesh?: RegExp
  ) => ModelBuilder;
  gotoFrame: (frame: number) => Promise<void>;
  morph: (influences: Record<string, number>) => ModelBuilder;
  fix: (mapper: ModelMeshMapper) => ModelBuilder;
  fixMesh: (mesh: ModelMesh, mapper: ModelMeshMapper) => ModelBuilder;
  fixMaterial: (mesh: ModelMesh, mapper: ModelMaterialMapper) => ModelBuilder;
  fixTexture: (
    material: ModelMaterial,
    mapper: ModelTextureMapper
  ) => ModelBuilder;
  color3: (value: string) => Color3;
  color4: (value: string) => Color4;
  // append: ({path: string|File | string[] | File[]}) => ModelBuilder;
  append: (path: ModelPath, name?: string) => Promise<ModelBuilder>;
  createTexture: (
    image: HTMLCanvasElement | HTMLImageElement
  ) => Promise<ModelTexture>;
  getMorphs: (search?: RegExp) => string[];
  addMorphRemaps: (remaps: MorphRemaps) => ModelBuilder;
  getModelNames: () => string[];
  setClearColor: (color: string) => ModelBuilder;
  setRotation: (model: string, radians: number) => ModelBuilder;
  getBBox: (model: string) => BoundingBox;
  wireframe: () => ModelBuilder;
  pickMesh: (
    x: number,
    y: number,
    predicate?: (mesh: ModelMesh) => boolean
  ) => Nullable<ModelMesh> | undefined;
  highlight: (mesh: ModelMesh, color: string) => ModelBuilder;
  unHighlight: (mesh?: ModelMesh) => ModelBuilder;
  addTestCube: () => ModelBuilder;
  render: () => ModelBuilder;
};

export type MorphRemaps = Record<string, string[]>;

export type ModelMesh = AbstractMesh;
export type ModelConcreteMesh = Mesh;
export type ModelNode = Node;
export type ModelMaterial = PBRMaterial;
export type ModelTexture = Texture;
export type ModelColor3 = Color3;
export type ModelColor4 = Color4;
export type ModelBoundingBox = BoundingBox;

export type ModelMeshMapper = (mesh: ModelMesh) => ModelMesh;
export type ModelMaterialMapper = (material: ModelMaterial) => ModelMaterial;
export type ModelTextureMapper = (texture: ModelTexture) => ModelTexture;
