import * as BABYLON from "@babylonjs/core";
import { BabEngine } from "../type/BabEngine";
export declare const spsDebug: ({ engine, canvas, }: {
    engine: BabEngine;
    canvas: HTMLCanvasElement;
}) => {
    scene: BABYLON.Scene;
    update: () => void;
};
