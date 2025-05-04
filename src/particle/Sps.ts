import {
  Mesh as BabMesh,
  Scene as BabScene,
  SolidParticle as BabSolidParticle,
  SolidParticleSystem as BabSolidParticleSystem,
  Color4,
  SolidParticleSystem,
  StandardMaterial,
} from "@babylonjs/core";
import { Asserts } from "@mjt-engine/assert";
import { Materials } from "../material/Materials";
import { getSolidParticleSystem } from "./getSolidParticleSystem";

export type Sps = {
  scene: BabScene;
  getSystem: () => BabSolidParticleSystem;
  dispose: () => void;
  getInstance: () => BabSolidParticleSystem;
  rebuild: () => void;
  update: () => void;
  addMesh: (mesh: BabMesh, count?: number) => void;
  removeMesh: (mesh: BabMesh) => void;
  syncParticlestoMeshes: () => void;
  hasMesh: (meshName: string) => boolean;
  updateParticlesByName: (
    name: string,
    fn: (particle: BabSolidParticle, index: number) => void
  ) => void;
  updateParticleByIndex: (
    index: number,
    fn: (particle: BabSolidParticle, index: number) => void
  ) => void;
  updateNextParticle: (
    name: string,
    fn: (particle: BabSolidParticle, index: number) => void
  ) => void;
  getNames: () => Iterable<string>;
};

export const Sps = (
  scene: BabScene,
  name: string,
  options: Partial<{ material: string; onMeshBuild: (mesh: BabMesh) => void }> &
    Parameters<typeof getSolidParticleSystem>[2] = {}
): Sps => {
  const nextIndexMap = new Map<string, number>();
  const meshToCounts = new Map<BabMesh, number>();
  const meshToParticleIndexes = new Map<BabMesh, number[]>();
  const meshNameToParticleIndexes = new Map<string, number[]>();
  const meshNameToMesh = new Map<string, BabMesh>();
  const { material, onMeshBuild, ...rest } = options;

  let system: BabSolidParticleSystem;

  const renewSps = () => {
    system?.mesh.dispose(false);
    system = new SolidParticleSystem(name, scene, {
      ...rest,
    });
  };

  renewSps();

  const mod: Sps = {
    scene,
    getSystem: () => {
      return system;
    },
    getNames: () => {
      return meshNameToParticleIndexes.keys();
    },
    hasMesh: (meshName: string) => {
      return meshNameToParticleIndexes.has(meshName);
    },
    getInstance: () => {
      return system;
    },
    updateNextParticle: (name, fn) => {
      const indexesForName = Asserts.assertValue(
        meshNameToParticleIndexes.get(name)
      );
      const nextIndexForName = Asserts.assertValue(nextIndexMap.get(name));
      const nextIndex = indexesForName[nextIndexForName];
      mod.updateParticleByIndex(nextIndex, fn);
      nextIndexMap.set(name, nextIndexForName + 1);
    },
    updateParticleByIndex: (index, fn) => {
      const particle = system.particles[index];
      Asserts.assertValue(particle, `particle not found for ${index}`);
      particle.alive = true;
      fn(particle, index);
    },
    updateParticlesByName: (name, fn) => {
      const indexes = meshNameToParticleIndexes.get(name);
      if (indexes) {
        indexes.forEach((index) => {
          mod.updateParticleByIndex(index, fn);
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
      if (meshToCounts.has(mesh)) {
        throw new Error(
          `Mesh ${mesh.name} already exists in the Sps. Use removeMesh to remove it first.`
        );
      }
      nextIndexMap.set(mesh.name, 0);
      meshToCounts.set(mesh, n);
      meshNameToMesh.set(mesh.name, mesh);
      mod.rebuild();
      mesh.setEnabled(false);
    },
    rebuild: () => {
      renewSps();
      meshToParticleIndexes.clear();
      try {
        meshToCounts.forEach((count, mesh) => {
          system.addShape(mesh, count);
          for (let i = 0; i < count; i++) {
            const index = system.particles.length - 1 - i;

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
        const mesh = system.buildMesh();
        if (material) {
          mesh.material = Materials.getMaterial(scene, material);
        }
        onMeshBuild?.(mesh);
      } catch (e) {
        console.error(e);
      }
    },
    syncParticlestoMeshes: () => {
      meshToParticleIndexes.forEach((indexes, mesh) => {
        for (let i = 0; i < indexes.length; i++) {
          const index = indexes[i];
          const particle = Asserts.assertValue(system.particles[index]);
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
      nextIndexMap.clear();
      system?.mesh?.dispose();
      system.dispose();
    },
    update: () => {
      system.setParticles();
      nextIndexMap.forEach((_, meshName) => {
        nextIndexMap.set(meshName, 0);
      });
      system.particles.forEach((particle) => {
        particle.alive = false;
      });
    },
  };
  return mod;
};
