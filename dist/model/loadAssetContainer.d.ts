import { type ISceneLoaderProgressEvent } from "@babylonjs/core/Loading/sceneLoader";
import type { AssetContainer } from "@babylonjs/core/assetContainer";
import type { Scene } from "@babylonjs/core/scene";
export declare const loadAssetContainer: (scene: Scene, path: string | File, options?: Partial<{
    onProgress: (event: ISceneLoaderProgressEvent) => void;
}>) => Promise<AssetContainer>;
