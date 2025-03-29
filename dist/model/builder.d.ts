import type { ModelBuilder, ModelPath } from "./ModelBuilder";
import { Scene } from "@babylonjs/core/scene";
export declare const builder: (props?: {
    scene?: Scene;
    path?: ModelPath;
    exposure?: number;
    toneMappingEnabled?: boolean;
    addDefaultLights?: boolean;
    clearColor?: string;
}) => Promise<ModelBuilder>;
