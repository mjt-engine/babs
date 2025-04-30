import {
  Mesh as BabMesh,
  Scene as BabScene,
  SolidParticle as BabSolidParticle,
  SolidParticleSystem as BabSolidParticleSystem,
  Color3,
  Color4,
  SolidParticleSystem,
  StandardMaterial,
} from "@babylonjs/core";
import { Asserts } from "@mjt-engine/assert";
import { getSolidParticleSystem } from "./getSolidParticleSystem";
import { Materials } from "../material/Materials";

export type Sps = {
  scene: BabScene;
  dispose: () => void;
  getInstance: () => BabSolidParticleSystem;
  rebuild: () => void;
  update: () => void;
  addMesh: (mesh: BabMesh, count?: number) => void;
  removeMesh: (mesh: BabMesh) => void;
  syncParticlestoMeshes: () => void;
  hasMesh: (meshName: string) => boolean;
  updateParticle: (
    name: string,
    fn: (particle: BabSolidParticle, index: number) => void
  ) => void;
};

export const Sps = (
  scene: BabScene,
  name: string,
  options: Partial<{ material: string; onMeshBuild: (mesh: BabMesh) => void }> &
    Parameters<typeof getSolidParticleSystem>[2] = {}
): Sps => {
  const meshToCounts = new Map<BabMesh, number>();
  const meshToParticleIndexes = new Map<BabMesh, number[]>();
  const meshNameToParticleIndexes = new Map<string, number[]>();
  const meshNameToMesh = new Map<string, BabMesh>();
  const { material, onMeshBuild, ...rest } = options;

  let sps: BabSolidParticleSystem;

  const renewSps = () => {
    sps?.mesh?.dispose();
    sps = new SolidParticleSystem(name, scene, {
      ...rest,
    });
  };

  renewSps();

  const mod: Sps = {
    scene,
    hasMesh: (meshName: string) => {
      return meshNameToParticleIndexes.has(meshName);
    },
    getInstance: () => {
      return sps;
    },
    updateParticle: (name, fn) => {
      const indexes = meshNameToParticleIndexes.get(name);
      if (indexes) {
        indexes.forEach((index) => {
          const particle = sps.particles[index];
          Asserts.assertValue(particle, `particle not found for ${index}`);
          fn(particle, index);
        });
      }
    },

    removeMesh: (mesh: BabMesh) => {
      meshToCounts.delete(mesh);
      meshToParticleIndexes.delete(mesh);
      meshNameToParticleIndexes.delete(mesh.name);
      meshNameToMesh.delete(mesh.name);
      mod.rebuild();
    },
    addMesh: (mesh: BabMesh, n = 1) => {
      try {
        if (meshToCounts.has(mesh)) {
          return;
        }
        meshToCounts.set(mesh, n);
        meshNameToMesh.set(mesh.name, mesh);
        mod.rebuild();
      } catch (e) {
        console.error(e);
      }
    },
    rebuild: () => {
      renewSps();
      meshToParticleIndexes.clear();
      try {
        meshToCounts.forEach((count, mesh) => {
          sps.addShape(mesh, count);
          for (let i = 0; i < count; i++) {
            const index = sps.particles.length - 1 - i;

            meshToParticleIndexes.set(mesh, [
              ...(meshToParticleIndexes.get(mesh) || []),
              index,
            ]);
            meshNameToParticleIndexes.set(mesh.name, [
              ...(meshToParticleIndexes.get(mesh) || []),
              index,
            ]);
          }
        });
        const mesh = sps.buildMesh();
        if (material) {
          mesh.material = Materials.getMaterial(scene, material);
        }
        onMeshBuild?.(mesh);
        mod.syncParticlestoMeshes();
      } catch (e) {
        console.error(e);
      }
    },
    syncParticlestoMeshes: () => {
      meshToParticleIndexes.forEach((indexes, mesh) => {
        for (let i = 0; i < indexes.length; i++) {
          const index = indexes[i];
          const particle = Asserts.assertValue(sps.particles[index]);
          particle.position.copyFrom(mesh.position);
          particle.rotation.copyFrom(mesh.rotation);
          particle.scaling.copyFrom(mesh.scaling);
          if (mesh.material instanceof StandardMaterial) {
            const c3 = mesh.material.diffuseColor;
            particle.color = new Color4(c3.r, c3.g, c3.b, mesh.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      meshToCounts.clear();
      meshToParticleIndexes.clear();
      meshNameToParticleIndexes.clear();
      meshNameToMesh.clear();
      sps?.mesh?.dispose();
      sps.dispose();
    },
    update: () => {
      sps.setParticles();
    },
  };
  return mod;
};
